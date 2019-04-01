import cdk = require('@aws-cdk/cdk');
import iam = require('@aws-cdk/aws-iam')

export class CdkPlaygroundStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
  }
}
