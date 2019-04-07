import cdk = require('@aws-cdk/cdk');
import { VpcNetwork } from '@aws-cdk/aws-ec2';
import { Parameters } from '../lib/Parameters'
import rds = require('@aws-cdk/aws-rds')
import ec2 = require('@aws-cdk/aws-ec2')
export class CoreStack extends cdk.Stack {
  public readonly vpc: VpcNetwork

  constructor(scope: cdk.Construct, id: string, parameters: Parameters, props?: cdk.StackProps) {
    super(scope, id, props);

    this.vpc = new VpcNetwork(this, 'VPC');

    const dbSecurityGroup = new ec2.SecurityGroup(this, "dbSecurityGroup", {
      allowAllOutbound: true,
      groupName: 'dbSecurityGroup',
      vpc: this.vpc
    })

    const dbSubnetGroup = new rds.CfnDBSubnetGroup(this, "coredbsubnetgroup", {
      dbSubnetGroupDescription: 'Subnet group for core db',
      dbSubnetGroupName: 'coredbsubnetgroup',
      subnetIds: this.vpc.publicSubnets.map(item => item.subnetId)
    })
    dbSecurityGroup.addIngressRule(new ec2.AnyIPv4(), new ec2.TcpPort(3306))  // access to database from the outside world (temporary, 
                                                                              // later we will move db to private subnet and restrict trafic to specific IP range just to make it nice and secure)
    console.log(dbSecurityGroup.securityGroupId.toString())
    console.log(dbSubnetGroup.dbSubnetGroupName)
    console.log(this.vpc.availabilityZones)


    new rds.CfnDBCluster(this, "myDBCluster", {
      engine: 'aurora',
      engineMode: 'serverless',
      port: 3306,
      masterUserPassword: parameters.auroraAdminPassword,
      masterUsername: 'admin',
      scalingConfiguration: {
        autoPause: true,
        maxCapacity: 2,
        minCapacity: 2,
        secondsUntilAutoPause: 300
      },
      databaseName: 'CoreDb',
      sourceRegion: 'eu-west-1',
      vpcSecurityGroupIds: [dbSecurityGroup.securityGroupId.toString()],
      dbSubnetGroupName: dbSubnetGroup.dbSubnetGroupName,
      availabilityZones: this.vpc.availabilityZones

    })
  }
}
