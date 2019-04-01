#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/cdk');
import { CdkPlaygroundStack } from '../lib/cdk_playground-stack';

const app = new cdk.App();
new CdkPlaygroundStack(app, 'CdkPlaygroundStack');
