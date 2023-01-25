import {
  Stack,
  StackProps,
  aws_apigateway as apiGateway,
  aws_lambda as lambda,
  CfnOutput,
  RemovalPolicy,
  aws_dynamodb as dynamodb,
} from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import * as path from "path";
import { appEnv, tableName } from "../config/config";
import { AttributeType, GlobalSecondaryIndexProps, ProjectionType } from "aws-cdk-lib/aws-dynamodb";
import { lambdasConfig } from "./vars/vars";

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const name = appEnv;

    const api = new apiGateway.RestApi(this, `${name}ApiGateway`, {
      description: "Api for interacting with database",
      defaultCorsPreflightOptions: {
        allowHeaders: [
          "Content-Type",
          "X-Amz-Date",
          "Authorization",
          "X-ApiKey", // TODO: Auth
        ],
        allowMethods: ["GET", "PUT", "DELETE", "POST"],
        allowCredentials: true,
        allowOrigins: [
          "*", // TODO: Restrict
        ],
      },
    });


    const dynamoDbTable = new dynamodb.Table(this, `${name}DynamoTable`, {
      tableName: tableName,
      tableClass: dynamodb.TableClass.STANDARD,
      removalPolicy: RemovalPolicy.DESTROY,
      partitionKey: {
        name: "pk",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: "sk",
        type: dynamodb.AttributeType.STRING,
      },
      writeCapacity: 1,
      readCapacity: 1,
    });

    const globalSecondaryIndexProps: GlobalSecondaryIndexProps = {
      indexName: 'gsi1',
      partitionKey: {
        name: 'gsi1pk',
        type: AttributeType.STRING,
      },
      sortKey: {
        name: 'gsi1sk',
        type: AttributeType.STRING,
      },
      projectionType: ProjectionType.KEYS_ONLY,
      readCapacity: 1,
      writeCapacity: 1,
    };

    dynamoDbTable.addGlobalSecondaryIndex(globalSecondaryIndexProps);

    lambdasConfig.forEach((func) => {
      const lambdaFunction = new NodejsFunction(
        this,
        `${name}${func.name}Lambda`,
        {
          functionName: `${func.name}Lambda`,
          runtime: lambda.Runtime.NODEJS_14_X,
          bundling: {
            externalModules: ["aws-sdk"],
          },
          depsLockFilePath: path.join(__dirname, "..", "package-lock.json"),
          entry: path.join(
            __dirname,
            "..",
            "src",
            "apigateway",
            func.lambdaFolder,
            func.name,
            "handler.ts"
          ),
          environment: {
            TABLE_NAME: tableName,
            PRIMARY_KEY: "pk",
          },
        }
      );

      const resource = api.root.addResource(func.name);

      if (func.addId === true) {
        const primaryKey = resource.addResource("{pk}");
        const sortKey = primaryKey.addResource("{sk}");

        sortKey.addMethod(
          func.method,
          new apiGateway.LambdaIntegration(lambdaFunction, { proxy: true })
        );
      } else {
        resource.addMethod(
          func.method,
          new apiGateway.LambdaIntegration(lambdaFunction, { proxy: true })
        );
      }

      switch (func.method) {
        case "POST":
        case "PUT": // Explicitly grant write access
        case "DELETE":
          dynamoDbTable.grantReadWriteData(lambdaFunction);
        default: // Default to read only
          dynamoDbTable.grantReadData(lambdaFunction);
      }

      lambdaFunction.addEnvironment(tableName, dynamoDbTable.tableArn);
    });

    new CfnOutput(this, "apiUrl", { value: api.url });
    new CfnOutput(this, "contentTable", { value: dynamoDbTable.tableArn });
  }
}
