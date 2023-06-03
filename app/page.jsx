import Feed from "@components/Feed";

const Home = () => (
  <section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
      Poseri se
      <br className='max-md:hidden' />
      <span className='bluemoje text-center'> Pošteno</span>
    </h1>
    <p className='desc text-center'>
    Open-Source alat za <span style={{color: '#f2e558'}}><strong>Anonimno</strong></span> ostavljanje brze kritike. <span style={{color: '#FFF8F0'}}><strong>Prijavi se</strong></span> kako bi započeo, ili pretraži tuđa sranja.
    </p>

    <Feed />
  </section>
);

export default Home;