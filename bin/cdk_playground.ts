#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/cdk');
import { CdkPlaygroundStack } from '../lib/cdk_playground-stack';
import { IVpcNetwork } from '@aws-cdk/aws-ec2';
import { Parameters } from '../lib/Parameters';
import { CoreStack } from '../lib/core-stack';


export interface InterfaceWithCoreStuff extends cdk.StackProps {
    vpc: IVpcNetwork
}

const app = new cdk.App();

const params = new Parameters()
params.getParameters().then(parameters => {
    console.log(parameters)

    const coreStack = new CoreStack(app, "CoreStack");

    new CdkPlaygroundStack(app, "PlaygroundStack", parameters, {
        vpc: coreStack.vpc
    })
})