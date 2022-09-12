#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ApiStack } from '../cdk/apigateway';

const app = new cdk.App();
new ApiStack(app, 'MentoringworkshopCdkApiStack', {

   env: { region: 'us-east-2' },

    

});