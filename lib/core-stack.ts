import cdk = require('@aws-cdk/cdk');
import { VpcNetwork } from '@aws-cdk/aws-ec2';

export class CoreStack extends cdk.Stack {
  public readonly vpc: VpcNetwork

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.vpc = new VpcNetwork(this, 'VPC');
  }
}
