import { Profile, YouHaveToLogin } from "./Profile";

const Page = async () => {
  return (
    <>
      <YouHaveToLogin>
        <Profile />
      </YouHaveToLogin>
    </>
  );
};

export default Page;
