import { TriangleUpIcon } from "@radix-ui/react-icons";

export default function FeedbackList() {
  return (
    <ol className="feedback-list">
      <li className="feedback">
        <button>
          <TriangleUpIcon />
          <span>456</span>
        </button>
        <div>
          <p>B</p>
        </div>
        <div>
          <p>Company</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
            maiores sint dicta soluta earum eum.
          </p>
        </div>
        <p>4d</p>
      </li>
    </ol>
  );
}
