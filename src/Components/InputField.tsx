import { FormEventHandler, MouseEventHandler, ReactNode } from "react";
import { Button } from "./Button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type FormEventProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  content?: ReactNode;
  loading: boolean;
  buttonCaption: string;
  title?: string;
  responses: any;
  title2?: string;
};

export const InputField = (props: FormEventProps) => {
  const {
    onSubmit,
    onClick,
    content,
    loading,
    buttonCaption,
    title,
    responses,
    title2,
  } = props;
  return (
    <div className="w-3/6">
      <h2 className="text-xl font-bold bg-white w-fit">{title}</h2>
      <form onSubmit={onSubmit}>
        {content}
        <div className="flex justify-between">
          {loading ? (
            <Button disabled={true}>Loading</Button>
          ) : (
            <Button disabled={false} type="submit">
              {buttonCaption}
            </Button>
          )}
          <button
            className="h-10 px-2 mb-2 bg-white border-2 border-black w-content-fit hover:font-bold "
            type="reset"
            onClick={onClick}
          >
            clear
          </button>
        </div>
      </form>
      <h2 className="text-xl font-bold bg-white w-fit">{title2}:</h2>
      {loading ? (
        "Loading....."
      ) : (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          className="w-full px-2 mb-4 bg-white border-2 border-black rounded min-h-1/2 black"
        >
          {responses[0]?.content}
        </ReactMarkdown>
      )}
    </div>
  );
};
