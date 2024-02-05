import { FAQ } from "src/components";

export const PublicHomeFAQSegment = () => {
  return (
    <FAQ
      data={[
        {
          question: "How can I add a new bill to the application?",
          answer:
            "You can add a new bill anytime by clicking on the 'New Bill' button at the top of the application.",
        },
        {
          question: "Can I add bills in different currencies?",
          answer:
            "Certainly! Our application supports multiple currencies from around the world.",
        },
        {
          question: "How can I change or delete a previously added bill?",
          answer:
            "You can do that by going to the 'Settings' page for the selected bill.",
        },
        {
          question: "How can I invite other users to share bills?",
          answer:
            "While in the selected bill, go to the 'Users' page. If you are the administrator of the bill, you will find an invitation link for your friends there.",
        },
        {
          question: "How can I track the payment and sharing history of bills?",
          answer:
            "Every user assigned to the bill, upon entering the main page of the bill, can see the current payment balance and its history.",
        },
        {
          question:
            "Is there a feature for proportionally splitting bills, considering different expense amounts?",
          answer:
            "Certainly! When adding a new payment to the bill, you can choose the splitting method. By selecting 'Equal,' the bill will be divided equally among all selected users. Choosing 'Amount' allows you to specify a particular amount assigned to each user.",
        },
        {
          question:
            "What information is visible to other users when I share a bill with them?",
          answer:
            "All users assigned to the bill can see the payment history and payment balance of other users in the bill.",
        },
      ]}
    />
  );
};
