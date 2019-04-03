#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/cdk');
import { CdkPlaygroundStack } from '../lib/cdk_playground-stack';
import { CoreStack } from '../lib/core-stack';
import { IVpcNetwork } from '@aws-cdk/aws-ec2';


export interface InterfaceWithCoreStuff extends cdk.StackProps {
    vpc: IVpcNetwork
}

const app = new cdk.App();
new CoreStack(app, 'CoreStack');
new CdkPlaygroundStack(app, 'CdkPlaygroundStack');
