import Button from "../common/Button";

const LandingPage = () => {
  return (
    <section className="max-w-[800px] w-full mx-auto">
      <div className="flex flex-col justify-between h-screen gap-20 py-10 text-white">
        <div>
          <h1 className="text-[48px] leading-[74.4px] font-bold font-laila">
            Hi, I&apos;m Lumina.
          </h1>
          <h3 className="text-[48px] leading-[74.4px] font-bold font-laila">
            Your AI Companion
          </h3>
        </div>

        <div className="flex flex-col justify-center items-center gap-5">
          <Button
            className="bg-customPink px-20 py-2 text-center text-customBlack text-[24px] font-bold leading-[29.05px] cursor-pointer"
            href="/"
          >
            Get Started
          </Button>
          <Button
            className="bg-customPink px-20 py-2 text-center text-customBlack text-[24px] font-bold leading-[29.05px] cursor-pointer"
            href="/"
          >
            Sign In
          </Button>
        </div>

        <h4 className="text-center">
          By continuing, you agree to our{" "}
          <span>
            <a className="underline font-semibold" href="/"> Privacy Policy</a>
          </span>{" "}
          &{" "}
          <span>
            <a className="underline font-semibold" href="/"> Terms of Use</a>
          </span>
        </h4>
      </div>
    </section>
  );
};

export default LandingPage;
