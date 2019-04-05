import { SSM } from 'aws-sdk';

export class Parameters{
  
  public auroraAdminPassword: string
  public testUserPassword: string


  public async getParameters() {
    this.auroraAdminPassword = (await this.getParameterAsync("auroraAdminPassword", true)).Parameter.Value;
    this.testUserPassword = (await this.getParameterAsync("testUserPassword", true)).Parameter.Value;
    return this
  }

  private getParamFromSSMAsync(parameterName : string, withDecryption : boolean)
  {
    var ssm = new SSM()
    var params = {
      Name: parameterName, 
      WithDecryption: withDecryption
    };
    return new Promise((resolve, reject) => {
      ssm.getParameter(params, (err, result) =>{
        if (err) reject(err);
        else resolve(result)
      })
    })
  }

  private async getParameterAsync(parameterName : string, withDecryption : boolean): Promise<any>{
    return this.getParamFromSSMAsync(parameterName, withDecryption).then(function(res){
      return res
    })
  }
}
