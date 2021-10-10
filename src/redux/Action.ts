import DeploymentApi from "./DeploymentApi"

export const types: any = {
    CREATE_DEPLOYMENT_BEGIN: 'CREATE_DEPLOYMENT_BEGIN',
    CREATE_DEPLOYMENT_END: 'CREATE_DEPLOYMENT_END',
    CREATE_DEPLOYMENT_ERROR: 'CREATE_DEPLOYMENT_ERROR',

    LOAD_DEPLOYMENT_BEGIN: 'LOAD_DEPLOYMENT_BEGIN',
    LOAD_DEPLOYMENT_END: 'LOAD_DEPLOYMENT_END',
    LOAD_DEPLOYMENT_ERROR: 'LOAD_DEPLOYMENT_ERROR',

    DELETE_DEPLOYMENT_BEGIN: 'DELETE_DEPLOYMENT_BEGIN',
    DELETE_DEPLOYMENT_END: 'DELETE_DEPLOYMENT_END',
    DELETE_DEPLOYMENT_ERROR: 'DELETE_DEPLOYMENT_ERROR'


}

export const createDeployment = (data: any) => {
    return (dispatch: any) => {
        dispatch({ type: types.CREATE_DEPLOYMENT_BEGIN })
        return DeploymentApi.createDeployment(data).then(data => {
            dispatch({ type: types.CREATE_DEPLOYMENT_END, data })
        }).catch(error => {
            dispatch({ type: types.CREATE_DEPLOYMENT_ERROR, error })
        })
    }
}


export const loadDeployment = () => {
    return (dispatch: any) => {
        dispatch({ type: types.LOAD_DEPLOYMENT_BEGIN })
        return DeploymentApi.getDeployment().then(data => {
            dispatch({ type: types.LOAD_DEPLOYMENT_END, data })
        }).catch(error => {
            dispatch({ type: types.LOAD_DEPLOYMENT_ERROR, error })
        })
    }
}

export const deleteDeployment = (deploymentId: string) => {
    return (dispatch: any) => {
        dispatch({ type: types.DELETE_DEPLOYMENT_BEGIN })
        return DeploymentApi.deleteDeployment(deploymentId).then(data => {
            dispatch({ type: types.DELETE_DEPLOYMENT_END, data })
        }).catch(error => {
            dispatch({ type: types.DELETE_DEPLOYMENT_ERROR, error })
        })
    }
}