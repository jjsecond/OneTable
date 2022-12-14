#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ApiStack } from '../cdk/apigateway';
import { appEnv, region } from '../config/config';

const app = new cdk.App();
new ApiStack(app, appEnv, {

   env: { region: region },

    

});