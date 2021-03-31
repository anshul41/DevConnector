import PrivateRoute from '../routing/PrivateRoute';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const AddExperience = (props) => {
  const addNewExperience = (e) => {
    e.preventDefault();
    alert('adding experience', formData);
    console.log(formData);
  };
  const onChange = (e) => {
    debugger;
    if (e.target.name === 'current')
      setFormData({
        ...formData,
        [e.target.name]: e.target.checked,
      });
    else
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
  };

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    description: '',
    current: false,
  });

  const { title, company, location, from, to, description, current } = formData;
  return (
    <PrivateRoute>
      <section className='container'>
        <h1 className='large text-primary'>Add An Experience</h1>
        <p className='lead'>
          <i className='fas fa-code-branch'></i> Add any developer/programming
          positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form className='form' onSubmit={(e) => addNewExperience(e)}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Job Title'
              onChange={(e) => onChange(e)}
              name='title'
              value={title}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              onChange={(e) => onChange(e)}
              placeholder='* Company'
              name='company'
              value={company}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              onChange={(e) => onChange(e)}
              placeholder='Location'
              value={location}
              name='location'
            />
          </div>
          <div className='form-group'>
            <h4>From Date</h4>
            <input
              type='date'
              required
              onChange={(e) => onChange(e)}
              value={from}
              name='from'
            />
          </div>
          <div className='form-group'>
            <p>
              <input
                type='checkbox'
                onChange={(e) => onChange(e)}
                value={current}
                name='current'
                value=''
              />{' '}
              Current Job
            </p>
          </div>
          {!formData.current ? (
            <div className='form-group'>
              <h4>To Date</h4>
              <input
                type='date'
                required
                onChange={(e) => onChange(e)}
                value={to}
                name='to'
              />
            </div>
          ) : null}
          <div className='form-group'>
            <textarea
              name='description'
              value={description}
              cols='30'
              rows='5'
              onChange={(e) => onChange(e)}
              placeholder='Job Description'
            ></textarea>
          </div>
          <input type='submit' className='btn btn-primary my-1' />
          <Link className='btn btn-light my-1' to='dashboard'>
            Go Back
          </Link>
        </form>
      </section>
    </PrivateRoute>
  );
};

export default AddExperience;
