import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import cx from 'classnames';
import { Section, SHAPE, SECTION_THEME } from 'src/components/Section';
import { TabComponent }  from 'src/components/Tabs/TabComponent';
import { SocialLinks } from 'src/components/SocialLinks';
import './Meetup.scss';

export const CN = 'line-meetup';

export default class Meetup extends Component {

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
    id: PropTypes.string
  };

  static defaultProps = {};

  constructor(props) {
    super(props);

    autoBind(this);
  }

  renderAgenda() {
    const { config } = this.props;

    return config
      .agenda
      .map(({time, description}, index) => (
        <li key={index}>
          <span className="line-timetable">
            <span className="time">{time}</span>
            <span className="text">{description}
              <span className="underline">_______</span>
            </span>
          </span>
        </li>
      ));
  }

  getTabs() {
    return [
      {
        name: 'РОЗКЛАД',
        content:
          <div className="tabs__text-content  active">
            <div className="tabs__content-container">
              <ul className="schedule">
                {this.renderAgenda()}
              </ul>
            </div>
          </div>
      },
      {
        name: 'ПРО «DYNAMIC TALKS»',
        content:
          <div className="tabs__content-container">
            <div className="tabs-info">
              <p>JS Dynamic Talks - це серія регулярних мітапів, де спеціалісти будуть ділитись своїм
                досвідом і розкривати актуальні теми, обговорювати поточні тренди та існуючі проблеми,
                шукати варіанти їх вирішення. Ми бачимо Dynamic Talks як платформу публічного обміну знаннями
                та досвідом. Якщо вам є чим поділитись і ви бажаєте це робити - зв'яжіться з нами, ми додамо
                вас в один з наступних мітапів. Якщо треба, ми допоможемо пропрацювати презентацію та
                відточити доповідь.</p>
              <p>Перші декілька мітапів плануються у форматі: дві доповіді по напрямку front-end, плюс один
                спеціальний гість, який не обов'язково пов'язаний з фронтендом, але може розповісти щось
                цікаве для всіх. Цього разу до нас прийде Володимир Фльонц, який є засновником ГО «Електронна демократія»,
                а також приймав участь в розробці ProZorro і ми з ним обговоримо чи можна електрифікувати демократію.</p>
            </div>
          </div>
      }
    ];
  }

  render() {
    const {
      className,
      config,
      id
    } = this.props;

    return (
      <Section
        className={cx(CN, className)}
        config={config}
        id={id}
        shape={SHAPE.CIRCLE}
        showDateAndLocation
        theme={SECTION_THEME.WHITE}
        title="Meetup"
      >
        <TabComponent
          firstSelect={0}
          tabs={this.getTabs()}
        />

        <div className="add_to_us">
          <h3>Приєднюйтесь до спільноти:</h3>
          <SocialLinks config={config}/>
        </div>
      </Section>
    );
  }
}
