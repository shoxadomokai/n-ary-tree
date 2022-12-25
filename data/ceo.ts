import { Employee } from "../types";

export default {
  uniqueId: 1,
  name: "Mark Zuckerberg",
  subordinates: [
    {
      name: "Sarah Donald",
      uniqueId: 2,
      subordinates: [
        {
          name: "Cassandra Reynolds",
          uniqueId: 6,
          subordinates: [
            {
              name: "Mary Blue",
              uniqueId: 7,
              subordinates: []
            },
            {
              name: "Bob Saget",
              uniqueId: 8,
              subordinates: [
                {
                  name: "Tina Teff",
                  uniqueId: 9,
                  subordinates: [
                    {
                      name: "Will Turner",
                      uniqueId: 10,
                      subordinates: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "Tyler Simpson",
      uniqueId: 3,
      subordinates: [
        {
          name: "Harry Tobs",
          uniqueId: 11,
          subordinates: [
            {
              name: "Thomas Brown",
              uniqueId: 12,
              subordinates: []
            }
          ]
        },
        {
          name: "George Carrey",
          uniqueId: 13,
          subordinates: []
        },
        {
          name: "Gary Styles:",
          uniqueId: 14,
          subordinates: []
        }
      ]
    },
    {
      name: "Bruce Willis",
      uniqueId: 4,
      subordinates: []
    },
    {
      name: "Georgina Flangy",
      uniqueId: 5,
      subordinates: [
        {
          name: "Sophie Turner",
          uniqueId: 15,
          subordinates: []
        }
      ]
    }
  ]
} as Employee;
