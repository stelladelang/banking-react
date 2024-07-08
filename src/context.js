import React, { createContext, useState } from 'react';

const BankContext = createContext();

const BankProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const addAccount = (account) => {
    setAccounts([...accounts, { ...account, balance: 0 }]);
  };

  const updateBalance = (email, amount) => {
    setAccounts(
      accounts.map((acc) => {
        if (acc.email === email) {
          return { ...acc, balance: acc.balance + amount };
        }
        return acc;
      })
    );

    setCurrentUser((prevUser) => ({
      ...prevUser,
      balance: prevUser.balance + amount, // Update balance for current user
    }));
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <BankContext.Provider
      value={{
        accounts,
        addAccount,
        updateBalance,
        currentUser,
        setCurrentUser,
        logout,
      }}
    >
      {children}
    </BankContext.Provider>
  );
};

export { BankContext, BankProvider };
