import axios from "axios"



class DeploymentApi {
    static createDeployment(payload: object) {
        return axios('/deployment', {
            method: 'POST',
            data: payload
        })
    }

    static getDeployment() {
        return axios(`/deployment`)
    }

    static deleteDeployment(deploymentId: string) {
        return axios(`/deployment/${deploymentId}`, {
            method: 'DELETE',
        })
    }
}

export default DeploymentApi
