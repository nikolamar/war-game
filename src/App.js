import React, { Component } from 'react';
import Table from './Views/Table';
import Menu from './Views/Menu';
import Cards from './Views/Cards';
import Player from './Views/Player';
import Score from './Views/Score';
import { allCards, allPlayers } from './lib/defaults';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    newWar: false,
    congrats: false,
    about: false,
    error: false,
    loading: false,
    players: allPlayers(),
    handLimit: 10,
    offline: false,
    cards: [],
    clickable: true,
  }
  handleMenu = e => {
    switch(e.target.id) {
      case 'New War':
        this.dealCards();
        this.resetPlayers();
        this.setState({newWar: true, congrats: false, about: false, error: false, clickable: true});
        break;
      case 'Players':
        let { players } = this.state;
        if (players.length > 2) players.pop();
        else players = allPlayers();
        this.setState({ players });
        break;
      case 'Offline':
        this.setState({offline: !this.state.offline});
        break;
      case 'About':
        this.setState({newWar: false, congrats: false, about: true, error: false});
        break;
      case 'Back To Menu':
        this.setState({newWar: false, congrats: false, about: false, error: false});
        break;
    }
  }
  pause = time => new Promise(resolve => setTimeout(() => resolve(), time));
  handleCard = async () => {
    let { players, cards } = this.state;
    this.setState({clickable: false});
    let winner = cards[cards.length-1];
    await this.iterate(i => {
      winner = winner.strength === cards[i].strength ? cards[i] : 
      winner.strength > cards[i].strength ? winner : cards[i];
      console.log(cards[i].owner, cards[i].code)
    });
    const { owner } = winner;
    console.info('winner: ', winner.owner)
    await this.iterate(i => this.moveCard(i, 0, 'Table', i), 500);
    await this.pause(1500);
    await this.iterate(i => this.moveCard(i, Math.ceil(Math.random() * 360), owner), 100);
    await this.pause(400);
    await this.iterate(i => this.removeCard(i));
    players.map(p => p.name===owner ? p.score++ : null);
    this.setState({ players, clickable: true });

    if (this.state.cards.length <= 0) {
      this.setState({clickable: false});
      await this.pause(1000);
      this.setState({
        clickable: true,
        congrats: true,
        newWar: false
      });
      return;
    }
  }
  iterate = async (callback, pause = 0) => {
    const { players, cards } = this.state;
    for (let i = 1; i <= players.length; i++) {
      callback(cards.length-i);
      await this.pause(pause);
    }
  }
  removeCard = (i) => {
    const { cards } = this.state;
    this.setState({cards: cards.filter((_, j) => j !== i)});
  }
  moveCard = (i, deg = 0, owner = 'Table', order = 0, faceOn = true) => {
    const { cards } = this.state;
    cards[i].deg = deg;
    cards[i].owner = owner;
    cards[i].order = order;
    cards[i].faceOn = faceOn;
    this.setState({ cards });
  }
  resetPlayers = () => {
    this.setState({players: this.state.players.map((_, i) => allPlayers()[i])});
  }
  dealCards = () => {
    this.state.offline ? this.offline() : this.online();
  }
  offline = () => {
    const { players, handLimit } = this.state;
    const numbers = [];
    const cards = [];
    while (numbers.length < handLimit * players.length) {
      let random = Math.round(Math.random()*51);
      if (numbers.indexOf(random) > -1) continue;
      numbers[numbers.length] = random;
      const randomCard = allCards()[random];
      randomCard.order = numbers.length;
      randomCard.faceOn = false;
      randomCard.strength = random % 13 >= 10 ? (random % 13) + 2 : (random % 13) + 1;
      randomCard.owner = players[(numbers.length-1) % players.length].name;
      randomCard.deg = Math.round(Math.random() * 360);
      cards.push(randomCard);
    }
    cards.reverse();
    this.setState({ cards });
  }
  online = async () => {
    const { players, handLimit } = this.state;
    this.setState({clickable: false, loading: true});
    const resp = await this.getDeck();
    const id = resp.data.deck_id;
    const howMany = players.length * handLimit;
    const result = await this.getCards(id, howMany);
    const cards = result.data.cards.map((c, i) => {
      let { value, code } = c;
      if (isNaN(parseInt(value))) {
        if (value === 'ACE') value = 1;
        else if (value === 'JACK') value = 12;
        else if (value === 'QUEEN') value = 13;
        else value = 14;
      };
      c.order = i;
      c.id = code;
      c.image = require(`./assets/${code}.png`);
      c.faceOn = false;
      c.strength = parseInt(value);
      c.deg = Math.round(Math.random() * 360);
      c.owner = players[i % players.length].name;
      return c;
    });
    cards.reverse();
    this.setState({ cards, clickable: true, loading: false });
  }
  getDeck = () => this.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
  getCards = (id, howMany) => this.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=${howMany}`);
  get = async url => await axios(url).catch(error => this.setState({error: true, loading: false, newWar: false, about: false, congrats: false, clickable: true}));
  render() {
    return (
      <div className='App'>
        <Table {...this.state} />
        <Menu {...this.state} handleMenu={this.handleMenu} />
        <Cards {...this.state} />
        <Player {...this.state} handleCard={this.handleCard} />
        <Score {...this.state} />
      </div>
    );
  }
}

export default App;
