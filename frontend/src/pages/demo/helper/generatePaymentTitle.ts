interface PaymentTemplate {
  template: (destination: string) => string;
  destinations: string[];
}

export const generatePaymentTitle = () => {
  const templates: PaymentTemplate[] = [
    {
      template: (destination: string) => `Taxi to ${destination}`,
      destinations: [
        "the museum",
        "the airport",
        "downtown",
        "the theater",
        "the zoo",
      ],
    },
    {
      template: (destination: string) => `Trip to ${destination}`,
      destinations: [
        "the park",
        "a castle",
        "a mountain lake",
        "a nature reserve",
        "a vineyard",
      ],
    },
    {
      template: (destination: string) => `Dinner at ${destination}`,
      destinations: ["a restaurant", "a diner", "a cafe", "a bistro", "a pub"],
    },
    {
      template: (destination: string) => `Booking for ${destination}`,
      destinations: [
        "a concert",
        "a theater show",
        "a sports event",
        "a conference",
      ],
    },
    {
      template: (destination: string) => `Delivery from ${destination}`,
      destinations: [
        "a pizza place",
        "a burger joint",
        "a sushi bar",
        "a bakery",
        "a cafe",
      ],
    },
  ];

  const randomTemplate =
    templates[Math.floor(Math.random() * templates.length)];

  const randomDestination =
    randomTemplate.destinations[
      Math.floor(Math.random() * randomTemplate.destinations.length)
    ];

  return randomTemplate.template(randomDestination);
};
