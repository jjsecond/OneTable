import {
  Stack,
  StackProps,
  aws_apigateway as apiGateway,
  aws_lambda as lambda,
  CfnOutput,
  RemovalPolicy,
  aws_dynamodb as dynamodb,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new apiGateway.RestApi(this, 'cdkWorkshopApiGateway', {
      description: 'Api for interacting with database',
      defaultCorsPreflightOptions: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-ApiKey', // TODO: Auth
        ],
        allowMethods: ['GET', 'PUT'],
        allowCredentials: true,
        allowOrigins: [
          '*', // TODO: Restrict
        ],
      },
    });

    const dynamoDbTable = new dynamodb.Table(this, 'Content Table', {
      tableName: 'ContentTable',
      tableClass: dynamodb.TableClass.STANDARD,
      removalPolicy: RemovalPolicy.DESTROY,
      partitionKey: {
        name: 'contentPath',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'datePublishedEpox',
        type: dynamodb.AttributeType.NUMBER,
      },
    });

    [
      { name: 'getContent', method: 'GET' },
      { name: 'createContent', method: 'PUT' },
      // { name: 'deleteContent', method: 'DELETE' },
    ].forEach((func) => {
      const lambdaFunction = new lambda.Function(
        this,
        `cdkWorkshop${func.name}Lambda`,
        {
          functionName: `cdkWorkshop${func.name}Lambda`,
          runtime: lambda.Runtime.NODEJS_14_X,
          code: lambda.Code.fromAsset(
            path.join(__dirname, `/../src/apigateway/${func.name}`)
          ),
          handler: 'index.handler',
        }
      );

      const resource = api.root.addResource(func.name);

      resource.addMethod(
        func.method,
        new apiGateway.LambdaIntegration(lambdaFunction, { proxy: true })
      );

      switch (func.method) {
        case 'PUT': // Explicitly grant write access
          dynamoDbTable.grantReadWriteData(lambdaFunction);
        default: // Default to read only
          dynamoDbTable.grantReadData(lambdaFunction);
      }

      lambdaFunction.addEnvironment('contentTable', dynamoDbTable.tableArn);
    });

    new CfnOutput(this, 'apiUrl', { value: api.url });
    new CfnOutput(this, 'contentTable', { value: dynamoDbTable.tableArn });
  }
}
