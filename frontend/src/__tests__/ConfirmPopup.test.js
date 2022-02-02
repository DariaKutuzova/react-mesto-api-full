import React from 'react';
import renderer from 'react-test-renderer';
import ConfirmPopup from '../components/ConfirmPopup';

it('renders correctly', () => {
    const tree = renderer
        .create(<ConfirmPopup isOpen={true}
                              card={{
                                  "likes": [],
                                  "_id": "61bf8132842a2d00128a1ff1",
                                  "name": "gyer",
                                  "link": "https://www.imgonline.com.ua/examples/bee-on-daisy.jpg",
                                  "owner": {
                                      "name": "Мышka",
                                      "about": "НаруЖка00",
                                      "avatar": "https://images.wallpaperscraft.ru/image/single/shar_svechenie_siluet_141120_225x300.jpg",
                                      "_id": "bb397aec7c6ed8ff02690976",
                                      "cohort": "cohort-29"
                                  },
                                  "createdAt": "2021-12-19T19:00:02.903Z"
                              }}
                              onCardDelete={() => {
                              }}
                              onClose={() => {
                              }}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});