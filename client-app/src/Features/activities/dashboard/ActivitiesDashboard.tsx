import React, { useContext, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import ActivitieList from './ActivitieList'
import { observer } from 'mobx-react-lite'
import LoadingComponent from '../../../App/Layout/LoadingComponent'
import ActivityStore from "../../../../src/App/stores/activityStore";



const ActivitiesDashboard: React.FC = () => {
    const activityStore = useContext(ActivityStore)

    useEffect(() => {

        activityStore.loadActivities();
        // add empty array to prevent useEffect go loop
    }, [activityStore]);

    if (activityStore.loadingInitial) {
        return <LoadingComponent content="Loading activities..." />
    }

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivitieList />
            </Grid.Column>
            <Grid.Column width={6}>
                <h1>Activity filters</h1>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivitiesDashboard);
