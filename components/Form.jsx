import Link from "next/link";
import CloseIcon from '@mui/icons-material/Close';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: '#99aab5',
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" fontSize="large"/>,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" fontSize="large"/>,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" fontSize="large"/>,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" fontSize="large"/>,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" fontSize="large"/>,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
 return (
 <section className='w-full max-w-full flex-start flex-col'>
 <h1 className='head_text text-left'>
 <span className='bluemoje'>{type} Sranje</span>
 </h1>
 <p className='desc text-left max-w-md'>
 {type} i podijeli sa drugima svoje muke i kritike.
 </p>

 <form
 onSubmit={handleSubmit}
 className='mt-10 w-full max-w-2xl flex flex-col gap-7 '
 >
 <label>
 <span className='font-satoshi font-semibold text-base text-gray-300'>
 Tvoja objava:
 </span>

 <textarea
 value={post.prompt}
 onChange={(e) => setPost({ ...post, prompt: e.target.value })}
 placeholder='Poseri se tu...'
 required
 className='form_textarea '
 style={{ backgroundColor: '#202225', borderColor: "#23272a", color: 'white'}}
 />
 </label>

 <label>
 <span className='font-satoshi font-semibold text-base text-gray-300'>
 Tagovi{" "}
 <span className='font-normal'>
 (#Sto, #god):
 </span>
 </span>
 <input
 value={post.tag}
 onChange={(e) => setPost({ ...post, tag: e.target.value })}
 type='text'
 placeholder='#Tag'
 required
 className='form_input'
 style={{ backgroundColor: '#202225', borderColor: "#23272a", color: 'white'}}
 />
 </label>
 <label>
 <span className='font-satoshi font-semibold text-base text-gray-300'>
 Mood:
 </span>
 <div className="mt-2 "> 
   <StyledRating
     name="rating"
     value={post.rating}
     onChange={(event, newValue) => {
       setPost({ ...post, rating: newValue });
     }}
     IconContainerComponent={IconContainer}
     getLabelText={(value) => customIcons[value].label}
     size="large"
     highlightSelectedOnly
   />
   {/* Display the selected rating value here 
   {post.rating > 0 && (
     <div style={{ marginTop: 8 }}>
       {post.rating}/5
     </div>
   )}*/}
 </div>
 </label>

 <div className='flex-end mx-3 mb-5 gap-4'>
 <Link href='/' className='crveno text-sm'>
 <CloseIcon />
 </Link>

 <button
 type='submit'
 disabled={submitting}
 className='px-5 py-1.5 text-sm rounded-full text-white'
 style={{ backgroundColor: '#5865f2'}}
 >
 {submitting ? `${type}ing...` : type}
 </button>
 </div>
 </form>
 </section>
 );
};

export default Form;