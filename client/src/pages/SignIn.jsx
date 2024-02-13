import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  // Define state for form data
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Select loading and error state from Redux store
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dispatch sign-in start action
      dispatch(signInStart());

      // Send sign-in request to the server
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // If sign-in successful, dispatch sign-in success action and navigate to home
        const data = await response.json();
        dispatch(signInSuccess(data));
        navigate('/');
      } else {
        // If sign-in fails, dispatch sign-in failure action with error message
        const errorData = await response.json();
        dispatch(signInFailure(errorData.message));
      }
    } catch (error) {
      // If an error occurs during sign-in, dispatch sign-in failure action with error message
      dispatch(signInFailure(error.message));
    }
  };

  // Render sign-in form
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        {/* Email input field */}
        <input
          type='email'
          placeholder='Email'
          id='email'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        {/* Password input field */}
        <input
          type='password'
          placeholder='Password'
          id='password'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        {/* Sign-in button */}
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth/>
      </form>
      {/* Sign-up link */}
      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-500'>Sign up</span>
        </Link>
      </div>
      {/* Display error message if sign-in fails */}
      {error !== null && <p className='text-red-700 mt-5'>Something went wrong!</p>}

    </div>
  );
}
