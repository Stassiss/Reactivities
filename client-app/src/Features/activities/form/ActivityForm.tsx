import React, { useState, FormEvent, useContext, useEffect } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../App/models/activity'
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../App/stores/activityStore"
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
interface DetailProps {
    id: string
}
// get match and history from RouteComponentProps
const ActivityForm: React.FC<RouteComponentProps<DetailProps>> =
    ({ match, history }) => {

        const activityStore = useContext(ActivityStore);
        // destructuring activityStore
        const {
            createActivity,
            editActivity,
            setSubmiting,
            activity: initialFormState, //change activity name
            loadActivity,
            clearActivity
        } = activityStore;
        // if not selected,returns empty form
        const [activity, setActivity] = useState<IActivity>({
            id: "",
            title: "",
            category: "",
            description: "",
            date: "",
            city: "",
            venue: ""
        });
        useEffect(() => {
            if (match.params.id && activity.id.length === 0) {
                loadActivity(match.params.id)
                    .then(() => initialFormState && setActivity(initialFormState))
            }
            // cleanUp-set activity to null
            return () => {
                clearActivity();
            }
            // to run once,must add dependencys
        }, [loadActivity, activity.id.length,
            match.params.id, clearActivity, initialFormState]);





        // after creating/edditing "history.push()" will redirect to created/eddited activity
        const handleSubmit = () => {
            if (activity.id.length === 0) {
                let newActivity = {
                    ...activity,
                    id: uuid()
                }
                //after new creation,set detailView to newActivity ID.backticks NOT quotes-->
                createActivity(newActivity).then(() => history.push(`/activity/${newActivity.id}`));
            } else {
                // backticks NOT quotes-->
                editActivity(activity).then(() => history.push(`/activity/${activity.id}`));
            }

        }

        const handleInputChange = (event: FormEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            const { name, value } = event.currentTarget;
            setActivity({ ...activity, [name]: value })
        }
        return (
            <Segment clearing>
                <Form onSubmit={handleSubmit} >
                    <Form.Input
                        onChange={handleInputChange}
                        name="title"
                        placeholder="Title"
                        value={activity.title} />
                    <Form.TextArea onChange={handleInputChange}
                        name="description"
                        rows={2}
                        placeholder="Description"
                        value={activity.description} />
                    <Form.Input
                        onChange={handleInputChange}
                        name="category"
                        placeholder="Category"
                        value={activity.category} />
                    <Form.Input
                        onChange={handleInputChange}
                        name="date"
                        type="datetime-local"
                        placeholder="Date"
                        value={activity.date} />
                    <Form.Input
                        onChange={handleInputChange}
                        name="city"
                        placeholder="City"
                        value={activity.city} />
                    <Form.Input
                        onChange={handleInputChange}
                        name="venue"
                        placeholder="Venue"
                        value={activity.venue} />
                    <Button loading={setSubmiting} floated="right" positive type="submit" content="Submit" />
                    <Button onClick={() => history.push(`/activities`)} floated="right" type="button" content="Cancel" />
                </Form>
            </Segment>
        )
    }

export default observer(ActivityForm);
