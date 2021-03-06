import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';


class UpdateGoalForm extends Component {

  componentWillMount () {
    const { goal } = this.props
    this.props.initialize({
      title: goal.title,
      description: goal.description ? goal.description: '',
      imgUrl: goal.imgUrl,
      monthDue: goal.monthDue ? goal.monthDue: '',
      yearDue: goal.yearDue ? goal.yearDue: ''
     });
  }

renderField(field) {
  const { meta: { touched, error } } = field;
  const className = `form-group ${touched && error ? 'has-danger' : ''}`;

  return (
    <div className={className}>
      <label>{field.label}</label>
      <input
        className="form-control"
        type="text"
        {...field.input}
      />
      <div className="text-help">
        {touched ? error : ''}
      </div>
    </div>
  );
}

  render() {
    const { handleSubmit } = this.props

    return (
  <form id="updateGoalForm" className="updateGoalForm" onSubmit={handleSubmit}>
    <Field
      name="title"
      label="Goal Title"
      component={this.renderField}
    />
    <Field
      name="description"
      label="Description"
      component={this.renderField}
    />
    <Field
      name="imgUrl"
      label="Image URL"
      component={this.renderField}
    />
    <div className="form-group">
    <div className="col-xs-12">
    <label>Due:</label>
    </div>
    </div>
    <div className="col-xs-6 form-group">
    <label>Month</label>
    <Field
      parse={value => Number(value)}
      name="monthDue"
      className="form-control"
      component="select"
    >
      <option />
      <option value="0">January</option>
      <option value="1">February</option>
      <option value="2">March</option>
      <option value="3">April</option>
      <option value="4">May</option>
      <option value="5">June</option>
      <option value="6">July</option>
      <option value="7">August</option>
      <option value="8">September</option>
      <option value="9">October</option>
      <option value="10">November</option>
      <option value="11">December</option>
    </Field>
    </div>
    <div className="col-xs-6 form-group">
    <label>Year</label>
    <Field
      parse={value => Number(value)}
      name="yearDue"
      className="form-control"
      placeholder="YYYY"
      component="input"
      type="number"
      min="2017"
      max="3000"
    />
    </div>
    <div className="form-group">
      <button
        type="submit"
        className="btn btn-primary"
        value="submit"
        form="updateGoalForm"
      >Update Goal</button>
    </div>
  </form>
    )
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Enter a title!";
  }
  if (!values.imgUrl) {
    errors.imgUrl = "Add an image link!";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'updateGoalForm'
})(UpdateGoalForm)
