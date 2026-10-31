export function createUser(nickname, overrides = {}) {
  return {
    displayName: `Alex ${nickname}`,
    email: `qa_${nickname.toLowerCase()}_${Date.now()}@example.com`,
    password: 'QaPassword456',
    day: '22',
    month: 'March',
    year: '1992',
    firstName: 'Alex',
    lastName: nickname,
    address: '250 Testing Avenue',
    country: 'Canada',
    state: 'Ontario',
    city: 'Toronto',
    zipcode: 'M5V 2T6',
    mobileNumber: '14165550123',
    ...overrides,
  };
}

export function createCard(cardholderName) {
  return {
    name: cardholderName,
    number: '5555555555554444',
    cvc: '123',
    month: '08',
    year: '2030',
  };
}
