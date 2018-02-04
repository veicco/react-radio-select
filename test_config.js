import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import jsdom from 'jsdom'

const { JSDOM } = jsdom;
const { document } = (new JSDOM('')).window;
Enzyme.configure({ adapter: new Adapter() });
global.document = document;