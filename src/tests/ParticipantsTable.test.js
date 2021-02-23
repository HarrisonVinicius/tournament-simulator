import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ParticipantsTable from '../components/molecules/ParticipantsTable'
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';

configure({adapter: new Adapter()});

describe('<ParticipantsTable />', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallow(<ParticipantsTable/>)
    })
    
    it('should not render table rows when there are no registered participants', () => {
        expect(wrapper.find(TableRow)).toHaveLength(1)
    });

    it('should render table rows when there are registered participants', () => {
        const wrapper = shallow(<ParticipantsTable participants={[{name: 'test', phone: '111111111', email: 'test@test.com'}]} />);
        expect(wrapper.find(TableRow)).toHaveLength(2)
    });

    it('should render edit and delete button in a table row when there are registered participants', () => {
        const wrapper = shallow(<ParticipantsTable participants={[{name: 'test', phone: '111111111', email: 'test@test.com'}]} />);
        expect(wrapper.find(IconButton)).toHaveLength(2)
    });

})


