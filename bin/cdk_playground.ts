#!/usr/bin/env node
import cdk = require('@aws-cdk/cdk');

class CdkPlaygroundStack extends cdk.Stack {
    constructor(parent: cdk.App, name: string, props?: cdk.StackProps) {
      super(parent, name, props);
  
  
    }
  }

// Create a new CDK app
const app = new cdk.App();

// Add my stack to the app
new CdkPlaygroundStack(app, 'CdkPlaygroundStack');

app.run();