import React, { SyntheticEvent } from 'react'
import { Grid } from 'semantic-ui-react'
import { IActivity } from '../../../App/models/activity'
import ActivitieList from './ActivitieList'
import ActivitiyDetails from '../details/ActivitiyDetails'
import ActivityForm from '../form/ActivityForm'

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    selectedActivity: IActivity | null;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
    deleteActivity: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
    submitting: boolean;
    target: string;
}
const ActivitiesDashboard: React.FC<IProps> = ({
    activities,
    selectActivity,
    selectedActivity,
    editMode,
    setEditMode,
    setSelectedActivity,
    createActivity,
    editActivity,
    deleteActivity,
    submitting,
    target }) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivitieList
                    activities={activities}
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}
                    submitting={submitting}
                    target={target} />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode && (
                    <ActivitiyDetails
                        activity={selectedActivity}
                        setEditMode={setEditMode}
                        setSelectedActivity={setSelectedActivity}
                    />
                )}
                {editMode &&
                    <ActivityForm
                        // eslint-disable-next-line
                        key={selectedActivity && selectedActivity.id || 0}
                        setEditMode={setEditMode}
                        activity={selectedActivity!}
                        createActivity={createActivity}
                        editActivity={editActivity}
                        submitting={submitting}
                    />}
            </Grid.Column>
        </Grid>
    )
}

export default ActivitiesDashboard
