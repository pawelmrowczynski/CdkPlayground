import cdk = require('@aws-cdk/cdk');
import iam = require('@aws-cdk/aws-iam')
import { ServicePrincipal } from '@aws-cdk/aws-iam';

export class CdkPlaygroundStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /// Declare test group
    const group = new iam.Group(this, 'CdkGroup');
    group.attachManagedPolicy('arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess')
    group.attachManagedPolicy('arn:aws:iam::aws:policy/IAMUserChangePassword')

    // Declare test user
    const user = new iam.User(this, 'CdkUser', { 
      password: 'Asdfqwer1234',
      userName: 'CdkUser',
    });

    new iam.Role(this, "testCdkRole_ecInstance_AccessToS3",
    {
      roleName: "testCdkRole_ecInstance_AccessToS3",
      assumedBy: new ServicePrincipal('ec2.amazonaws.com')
    });

    // Connect those 2 together
    user.addToGroup(group);

    console.log(user)

    // Creating IAM instance from cfn resources (don't need it now, right?):
    ///new ec2.CfnInstance(this, "MyInstance", {
    ///  imageId: 'ami-07683a44e80cd32c5',
    ///  instanceType: 't2.micro',
    ///})
  }
}
