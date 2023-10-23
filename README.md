# EDIT: Comments on changes made to the Opvia Product Challenge

The following additions have been made to the Opvia starting point:

1) A title for the product has been added
2) Inputs/buttons have been added to enter formulae, to create columns and to create aggregate variables
3) Hyperformula's range of functions has been utilised, in order to provide a large number of operations which can be used. See https://hyperformula.handsontable.com/guide/built-in-functions.html#list-of-available-functions for the available operations
4) An ag-grid-react component has been added to display the aggregate variables. 
5) Removal of columns can be done via the icon located in the column header
6) Removal of aggregate variables can be done via the icon in the ag-grid row
7) Display of the selected region underneath the table for assistance in writing formulae 
8) A tip to assist in writing formula
9) Styling in accordance with the Opvia theme

    If more time: would have liked to have spent more time on potentially refactoring, double checking types, etc. It would have been nice to be able to select a region and have the formula input be autofilled in some way. Also, always cool to add new+cool features!




# Opvia Take-home Product Challenge

Congratulations on being selected for the next stage of our interview process!

We really appreciate the time you have invested in the process so far and only invited you to this next challenge because we think there's a very good chance you'd be a great fit at Opvia. This is the penultimate step in the interview process! For context at this stage the probability of a candidate receiving an offer is (~25%).

This is our only opportunity to see how you deliver on a product problem, so we it very highly.

## How to complete this stage of the interview process

1. Please clone this repo and use it as your starting point. This is a simple create-react-app featuring the blueprintjs table component https://blueprintjs.com/docs/#table
2. Complete the 'Opvia product problem' below
3. When you are done, create a private repo and push your code to it
4. Invite _hfmw_ & _OliverWales_ to view the repo

## Opvia product problem

Scientists are using Opvia to store all their data in a standardised structure. The example data has come from a scientists who is uploading their bioreactor data into Opvia.

They have said that it would be useful if they could calculate the cell count in Opvia, as well as being able to see its maximum value.

The Opvia platform allows scientists to build what they need. So, instead of building in these specific features, we have identified two higher level features which would enable the customer to achieve what they need, whilst also being useful for other use-cases.

1. `Calculation columns`, where the user can add a column with a formula such as `Cell Density * Volume`
2. `Column aggregations`, where the user can aggregate data from a column e.g. `Max Cell Count`

You have a call scheduled with the scientist. Build a working MVP that you could give the user access to to get their feedback.

#### FAQS

- Can I change the structure/content of the raw data? - yes feel free to, but don't feel obligated to (this is a product not an engineering challenge)
- Where is the data coming from? It's from an instrument (a bioreactor). 
- Unsure whether to submit? Would you happily get on a call with a scientist and give them access? Would what you've showed them make them more excited about using Opvia?
- Ran out of time? Document any features that you'd like to have built.
- I have a question? Please ask!! Email `oli@opvia.io` and cc  `will@opvia.io`
- How should I communicate? Please over communicate. We want to learn what it's like to work with you :)
- Do I need to write tests? - not unless it helps you! We're just looking for "a working MVP that you could give the user access to to get their feedback"
