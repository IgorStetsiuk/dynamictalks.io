import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import cx from 'classnames';
import { Logo, LOGO_THEME } from 'src/components/Section/Logo';
import { EventDate, ED_THEME } from 'src/components/Section/EventDate';
import { EventPlace, EP_THEME } from 'src/components/Section/EventPlace';
import { RegistrationButton, BUTTON_THEME } from 'src/components/Section/RegistrationButton';
import { SECTION_THEME, SHAPE } from '../constants';
import './SectionHeader.scss';


export const CN = 'section-header';
export const TITLE_THEMES = {
  PRIMARY: 'primary',
  SECONDERY: 'secondery'
};


export default class SectionHeader extends Component {

  static propTypes = {

    /**
     * className - classes which can be passed from parent
     */
    className: PropTypes.string,

    /**
     * config - configuration object
     */
    config: PropTypes.object.isRequired,

    /**
     * id - id of the section
     */
    id: PropTypes.string,

    /**
     * shape - shape to show below the title
     */
    shape: PropTypes.oneOf([SHAPE.TRIANGLE, SHAPE.CIRCLE, SHAPE.SQUARE]),

    /**
     * showDateAndLocation - determines is date and location line is visible
     */
    showDateAndLocation: PropTypes.bool,

    /**
     * theme - style of the rendering
     */
    theme: PropTypes.oneOf([SECTION_THEME.WHITE, SECTION_THEME.YELLOW]),

    /**
     * title to be shown
     */
    title: PropTypes.string,
  };

  static defaultProps = {
    showDateAndLocation: false,
    theme: SECTION_THEME.YELLOW
  };

  constructor(props) {
    super(props);

    autoBind(this);
  }


  getThemes() {
    const { theme } = this.props;

    switch (theme) {
      case SECTION_THEME.WHITE:
        return {
          logoTheme: LOGO_THEME.COLORED,
          eventDateTheme: ED_THEME.YELLOW,
          regButtonTheme: BUTTON_THEME.YELLOW,
          eventPlaceTheme: EP_THEME.YELLOW,
          titleTheme: TITLE_THEMES.PRIMARY
        };
      case SECTION_THEME.YELLOW:
      default:
        return {
          logoTheme: LOGO_THEME.BW,
          eventDateTheme: ED_THEME.WHITE,
          regButtonTheme: BUTTON_THEME.YELLOW,
          eventPlaceTheme: EP_THEME.WHITE,
          titleTheme: TITLE_THEMES.SECONDERY
        };
    }
  }


  render() {
    const {
      className,
      config,
      id,
      title,
      shape,
      showDateAndLocation
    } = this.props;
    const themes = this.getThemes();


    return (
      <div className={cx(CN, className)}>
        <div className={`${CN}__col ${CN}__col--left`}>
          <Logo theme={themes.logoTheme}/>
          {
            showDateAndLocation &&
            <EventDate
              city={config.eventDate.city}
              theme={themes.eventDateTheme}
              timeString={config.eventDate.timeString}
            />
          }
        </div>


        <div className={`${CN}__col ${CN}__col--middle`}>
          { title && <h2 className={`${CN}__title ${CN}__title--${themes.titleTheme}`}>{title}</h2> }
          { shape && <div className={`${CN}__shape ${CN}__shape--${shape}`}/> }
        </div>


        <div className={`${CN}__col ${CN}__col--right`}>
          <RegistrationButton
            config={config}
            id={id}
            theme={themes.regButtonTheme}
          />
          {
            showDateAndLocation &&
            <EventPlace
              config={config}
              theme={themes.eventPlaceTheme}
            />
          }
        </div>
      </div>
    );
  }
}
