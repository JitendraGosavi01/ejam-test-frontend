import { combineReducers } from "redux";
import { types } from "./Action";
const initialState: any = {
    CREATE_DEPLOYMENT: { callsInProgress: 0, name: 'CREATE_DEPLOYMENT', status: '', data: {}, message: '' },
    DELETE_DEPLOYMENT: { callsInProgress: 0, name: 'DELETE_DEPLOYMENT', status: '', data: {}, message: '' },
    LOAD_DEPLOYMENT: { callsInProgress: 0, name: 'LOAD_DEPLOYMENT', status: '', data: [], message: '' }
}
const createDeploymentReducer = (state = initialState.CREATE_DEPLOYMENT, action: any) => {
    let progressCount: number = state.callsInProgress
    const name: string = state.name
    switch (action.type) {
        case types.CREATE_DEPLOYMENT_BEGIN:
            progressCount++
            return { name, callsInProgress: progressCount, status: 'INPROGRESS', message: '', data: {} }
        case types.CREATE_DEPLOYMENT_END:
            progressCount--
            return { name, callsInProgress: progressCount, status: 'SUCCESS', message: action.data.data.message, data: action.data.data.data }
        case types.CREATE_DEPLOYMENT_ERROR:
            progressCount--
            return { name, callsInProgress: progressCount, status: 'ERROR', message: action.error, data: {} }
        default:
            return state;
    }
}

const deleteDeploymentReducer = (state = initialState.DELETE_DEPLOYMENT, action: any) => {
    let progressCount: number = state.callsInProgress
    const name: string = state.name
    switch (action.type) {
        case types.DELETE_DEPLOYMENT_BEGIN:
            progressCount++
            return { name, callsInProgress: progressCount, status: 'INPROGRESS', message: '', data: {} }
        case types.DELETE_DEPLOYMENT_END:
            progressCount--
            return { name, callsInProgress: progressCount, status: 'SUCCESS', message: action.data.data.message, data: action.data.data.data }
        case types.DELETE_DEPLOYMENT_ERROR:
            progressCount--
            return { name, callsInProgress: progressCount, status: 'ERROR', message: action.error, data: {} }
        default:
            return state;
    }
}

const loadDeploymentReducer = (state = initialState.LOAD_DEPLOYMENT, action: any) => {
    let progressCount: number = state.callsInProgress
    const name: string = state.name
    switch (action.type) {
        case types.LOAD_DEPLOYMENT_BEGIN:
            progressCount++
            return { name, callsInProgress: progressCount, status: 'INPROGRESS', message: '', data: {} }
        case types.LOAD_DEPLOYMENT_END:
            progressCount--
            return { name, callsInProgress: progressCount, status: 'SUCCESS', message: action.data.data.message, data: action.data.data.data }
        case types.LOAD_DEPLOYMENT_ERROR:
            progressCount--
            return { name, callsInProgress: progressCount, status: 'ERROR', message: action.error, data: {} }
        default:
            return state;
    }
}
const rootReducer = combineReducers({
    createdDeployment: createDeploymentReducer,
    deletedDeployment: deleteDeploymentReducer,
    deploymentData: loadDeploymentReducer
})

export default rootReducer
// export type RootState = ReturnType<typeof rootReducer>