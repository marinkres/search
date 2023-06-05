import PromptCard from "./PromptCard";
import BeatLoader from 'react-spinners/BeatLoader';
import React, { useState } from 'react';
import { useEffect } from "react";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const [loading, setLoading] = useState(true);

  // simulate data fetching
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='bluemoje'>{name} Profil</span>
      </h1>
      <p className='desc text-left'>{desc}</p>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
          <BeatLoader color={'#5865f2'} />
          <p style={{ color: '#707bf4' }}>Učitavanje...</p>
        </div>      
      ) : (
        <div className='mt-10 prompt_layout'>
          {data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Profile;