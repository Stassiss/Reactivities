import React, { useContext } from 'react'
import { Grid } from 'semantic-ui-react'
import ActivitieList from './ActivitieList'
import ActivitiyDetails from '../details/ActivitiyDetails'
import ActivityForm from '../form/ActivityForm'
import { observer } from 'mobx-react-lite'
import ActivityStore from "../../../App/stores/activityStore";


const ActivitiesDashboard: React.FC = () => {
    const activityStore = useContext(ActivityStore);
    const { editMode, selectedActivity } = activityStore;
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivitieList />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode && (
                    <ActivitiyDetails
                    />
                )}
                {editMode &&
                    <ActivityForm
                        // eslint-disable-next-line
                        key={selectedActivity && selectedActivity.id || 0}
                        activity={selectedActivity!}
                    />}
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivitiesDashboard);
