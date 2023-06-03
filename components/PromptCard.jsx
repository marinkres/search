"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Person } from "@mui/icons-material";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" fontSize="small" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" fontSize="small"/>,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" fontSize="small"/>,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" fontSize="small"/>,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" fontSize="small"/>,
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

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
 const { data: session } = useSession();
 const pathName = usePathname();
 const router = useRouter();

 const [copied, setCopied] = useState("");

 const handleProfileClick = () => {
 console.log(post);

 if (post.creator._id === session?.user.id) return router.push("/profile");

 router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
 };

 const handleCopy = () => {
 setCopied(post.prompt);
 navigator.clipboard.writeText(post.prompt);
 setTimeout(() => setCopied(false), 3000);
 };
 const randomColor = () => {
 const r = Math.floor(Math.random() * 256);
 const g = Math.floor(Math.random() * 256);
 const b = Math.floor(Math.random() * 256);
 return `rgb(${r}, ${g}, ${b})`;
 };
 return (
 <div className='prompt_card'>
 <div className='flex justify-between items-start gap-5'>
 <div
 className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
 onClick={handleProfileClick}
 >
 <div
 style={{
 backgroundColor: randomColor(),
 width: 40,
 height: 40,
 display: "flex",
 justifyContent: "center",
 alignItems: "center",
 }}
 className='rounded-full'
 >
 <Person style={{ color: "white" }} />
 </div>

 <div className='flex flex-col'>
 <h3 className='font-satoshi font-semibold ' style={{color:'#FFF8F0'}}>
 {post.creator.username}
 </h3>
 {/*
 <p className='font-inter text-sm text-gray-500'>
 {post.creator.email}
 </p>
 */}
 </div>
 </div>

 <div className='copy_btn' onClick={handleCopy}>
 <Image
 src={
 copied === post.prompt
 ? "/assets/icons/tick.svg"
 : "/assets/icons/copy.svg"
 }
 alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
 width={12}
 height={12}
 />
 </div>
 </div>

 <p className='my-4 font-satoshi text-sm text-gray-300'>{post.prompt}</p>
 {/* Display the rating data using the Material-UI Rating component */}
   <StyledRating
     name="read-only"
     value={post.rating}
     readOnly
     IconContainerComponent={IconContainer}
     getLabelText={(value) => customIcons[value]?.label ?? ''}
     size="small"
   />
 <p
 className='font-inter text-sm bluemoje cursor-pointer'
 onClick={() => handleTagClick && handleTagClick(post.tag)}
 >
 #{post.tag}
 </p>

 {session?.user.id === post.creator._id && pathName === "/profile" && (
 <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
 <p
 className='font-inter text-sm green_gradient cursor-pointer'
 onClick={handleEdit}
 >
 Uredi
 </p>
 <p
 className='font-inter text-sm crveno cursor-pointer'
 onClick={handleDelete}
 >
 Obriši
 </p>
 </div>
 )}
 </div>
 );
};

export default PromptCard;