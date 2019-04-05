import cdk = require('@aws-cdk/cdk');
import iam = require('@aws-cdk/aws-iam')
import { ServicePrincipal } from '@aws-cdk/aws-iam';
import { InterfaceWithCoreStuff } from '../bin/cdk_playground';
import { Parameters } from '../lib/Parameters'

export class CdkPlaygroundStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, parameters: Parameters, props: InterfaceWithCoreStuff) {
    super(scope, id, props);
    
    /// Declare test group
    const group = new iam.Group(this, 'CdkGroup');
    group.attachManagedPolicy('arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess')
    group.attachManagedPolicy('arn:aws:iam::aws:policy/IAMUserChangePassword')

    ///Declare test user
    const user = new iam.User(this, 'CdkUser', { 
     password: parameters.testUserPassword,
     userName: 'CdkUser',
    });
    
    user.addToGroup(group);

    new iam.Role(this, "testCdkRole_ecInstance_AccessToS3",
    {
      roleName: "testCdkRole_ecInstance_AccessToS3",
      assumedBy: new ServicePrincipal('ec2.amazonaws.com')
    });
  }
}
