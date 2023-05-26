import Feed from "@components/Feed";

const Home = () => (
  <section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
      Poseri se
      <br className='max-md:hidden' />
      <span className='blue_gradient text-center'> Pošteno</span>
    </h1>
    <p className='desc text-center'>
      Poserise je open-source alat za ostavljanje brze kritike, dodaj svoju, pretraži tuđe.
    </p>

    <Feed />
  </section>
);

export default Home;