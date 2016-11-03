import React from 'react';
import { Field, reduxForm } from 'redux-form';

@reduxForm({
    form: 'expForm'
})
export default class ExpForm extends React.Component {
    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <Field name="title" component="input" type="text"/>
                </div>
                <div>
                    <label htmlFor="type">Type</label>
                    <Field name="type" component="select">
                        <option value="Employment">Employment</option>
                        <option value="Position">Position</option>
                        <option value="Project">Project</option>
                        <option value="Contribution">Contribution</option>
                        <option value="Task">Task</option>
                        <option value="Other">Other</option>
                    </Field>
                </div>

                <div>
                    <label>Recurring: </label>
                    <Field name="recurring" component="input" type="checkbox"/>
                </div>

                <div>
                    <label>Short Summary: </label>
                    <Field name="summary" component="input" type="text"/>
                </div>

                <div>
                    <label>Long Summary: </label>
                    <Field name="explanation" component="textarea"/>
                </div>
            </form>


        );
    }
}