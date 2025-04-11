import { emailIcon, phoneIcon, whiteLogo } from "./svgs/vectors";

export const Footer = () => {
  return (
    <div className="w-screen px-20 py-10 bg-indigo-700 justify-between gap-30 text-white flex">
      <div className="flex flex-col gap-3 ">
        <div className="flex gap-2 items-center">{whiteLogo} Movie Z</div>
        <p>© 2024 Movie Z. All Rights Reserved.</p>
      </div>
      <div className="flex  gap-24 justify-end">
        <div className="flex flex-col gap-3">
          <div>
            <p>Contact Information</p>
          </div>
          <div className="flex flex-col  gap-6">
            <div className="flex ">
              <div className="flex justify-start items-center py-w pr-3 ">
                {emailIcon}
              </div>
              <div>
                <p> Email:</p>
                <p>support@movieZ.com</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex justify-start items-center py-w pr-3 ">
                {phoneIcon}
              </div>
              <div>
                <p> phone:</p>
                <p>+976 (11) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm ">follow us</p>
          <p className="flex gap-3 text-ld">
            Facebook Instagram Twitter Youtube
          </p>
        </div>
      </div>
    </div>
  );
};
