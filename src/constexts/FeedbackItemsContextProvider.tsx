import { createContext, useEffect, useMemo, useState } from "react";
import { TFeedbackItem } from "../lib/types";

type FeedbackItemsContextProviderProps = {
  children: React.ReactNode;
};

type TFeedbackItemsContext = {
  filteredFeedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  companyList: string[];
  handleAddToList: (text: string) => void;
  handleSelectCompany: (company: string) => void;
};

export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(
  null
);

export default function FeedbackItemsContextProvider({
  children,
}: FeedbackItemsContextProviderProps) {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<string>("");

  const companyList = useMemo(
    () =>
      feedbackItems
        .map(item => item.company)
        .filter((company, index, array) => {
          return array.indexOf(company) === index;
        }),
    [feedbackItems]
  );

  const filteredFeedbackItems = useMemo(
    () =>
      selectedCompany
        ? feedbackItems.filter(
            feedbackItem => feedbackItem.company === selectedCompany
          )
        : feedbackItems,
    [selectedCompany, feedbackItems]
  );

  const handleAddToList = async (text: string) => {
    const companyName = text
      .split(" ")
      .find(word => word.includes("#"))!
      .substring(1);

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text,
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
    };

    setFeedbackItems([...feedbackItems, newItem]);

    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      }
    );
  };

  const handleSelectCompany = (company: string) => {
    setSelectedCompany(company);
  };

  const fetchFeedbackItems = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      setFeedbackItems(data.feedbacks);
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again later.");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchFeedbackItems();
  }, []);

  return (
    <FeedbackItemsContext.Provider
      value={{
        filteredFeedbackItems,
        isLoading,
        errorMessage,
        companyList,
        handleAddToList,
        handleSelectCompany,
      }}
    >
      {children}
    </FeedbackItemsContext.Provider>
  );
}