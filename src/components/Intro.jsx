import { useFetcher } from "react-router-dom";
import { HiOutlineUserAdd } from "react-icons/hi";
import IllustrationImg from "../assets/illustration.jpg";

const Intro = () => {
  const fetcher = useFetcher();

  const isSubmitting = fetcher.state === "submitting";

  return (
    <div className="intro">
      <div>
        <h1>
          Take Control of <span className="accent">Money</span>
        </h1>
        <p>
          Personal budgeting is the secret to financial freedom. Start your
          journey today
        </p>
        <fetcher.Form method="post">
          <input
            type="text"
            name="userName"
            placeholder="What is your name?"
            aria-label="your Name"
            autoComplete="given-name"
          />

          <input type="hidden" name="_action" value="newUser" />

          <button
            type="submit"
            className="btn btn--dark"
            disabled={isSubmitting}
          >
            <span>Create Account</span>
            <HiOutlineUserAdd width={20} />
          </button>
        </fetcher.Form>
      </div>
      <img src={IllustrationImg} alt="a person with money" />
    </div>
  );
};

export default Intro;
