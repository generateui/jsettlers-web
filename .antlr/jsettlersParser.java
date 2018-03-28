// Generated from c:\Users\Ruud\Desktop\jsettlers-web\jsettlers.g4 by ANTLR 4.7.1
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class jsettlersParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.7.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, T__5=6, T__6=7, T__7=8, T__8=9, 
		T__9=10, T__10=11, T__11=12, T__12=13, T__13=14, T__14=15, T__15=16, T__16=17, 
		T__17=18, T__18=19, T__19=20, T__20=21, T__21=22, T__22=23, T__23=24, 
		T__24=25, T__25=26, T__26=27, T__27=28, T__28=29, T__29=30, T__30=31, 
		T__31=32, T__32=33, T__33=34, T__34=35, T__35=36, T__36=37, T__37=38, 
		T__38=39, T__39=40, T__40=41, T__41=42, T__42=43, T__43=44, T__44=45, 
		T__45=46, T__46=47, T__47=48, T__48=49, T__49=50, T__50=51, T__51=52, 
		T__52=53, T__53=54, T__54=55, T__55=56, T__56=57, T__57=58, T__58=59, 
		T__59=60, T__60=61, T__61=62, T__62=63, T__63=64, T__64=65, T__65=66, 
		T__66=67, T__67=68, T__68=69, T__69=70, T__70=71, T__71=72, T__72=73, 
		T__73=74, T__74=75, T__75=76, T__76=77, T__77=78, T__78=79, T__79=80, 
		T__80=81, T__81=82, T__82=83, T__83=84, T__84=85, T__85=86, T__86=87, 
		T__87=88, T__88=89, T__89=90, T__90=91, T__91=92, T__92=93, T__93=94, 
		T__94=95, T__95=96, T__96=97, T__97=98, T__98=99, T__99=100, T__100=101, 
		T__101=102, T__102=103, T__103=104, T__104=105, T__105=106, T__106=107, 
		T__107=108, T__108=109, T__109=110, T__110=111, T__111=112, T__112=113, 
		T__113=114, T__114=115, T__115=116, T__116=117, T__117=118, T__118=119, 
		T__119=120, T__120=121, T__121=122, T__122=123, T__123=124, T__124=125, 
		T__125=126, T__126=127, T__127=128, T__128=129, T__129=130, T__130=131, 
		T__131=132, T__132=133, T__133=134, T__134=135, T__135=136, T__136=137, 
		T__137=138, T__138=139, T__139=140, T__140=141, T__141=142, T__142=143, 
		T__143=144, T__144=145, T__145=146, T__146=147, T__147=148, T__148=149, 
		T__149=150, T__150=151, T__151=152, NUMBER=153, NL=154, INDENT=155, SPACE=156, 
		U_BUILD=157, U_DICE=158, U_PORT=159, U_CHECK=160, U_CHECK_GREEN=161, U_FLAT=162, 
		U_POINTY=163, U_BAG=164, U_X=165, NODEDOT=166;
	public static final int
		RULE_at = 0, RULE_times = 1, RULE_script = 2, RULE_game = 3, RULE_gameOptions = 4, 
		RULE_gameOption = 5, RULE_robber = 6, RULE_pirate = 7, RULE_placementSequence = 8, 
		RULE_board = 9, RULE_boardOption = 10, RULE_hexesBag = 11, RULE_portsBag = 12, 
		RULE_chitsBag = 13, RULE_layout2D = 14, RULE_coord = 15, RULE_x = 16, 
		RULE_y = 17, RULE_z = 18, RULE_coord3D = 19, RULE_row = 20, RULE_column = 21, 
		RULE_coord2D = 22, RULE_coord1D = 23, RULE_orientation = 24, RULE_pointy = 25, 
		RULE_flat = 26, RULE_odd = 27, RULE_even = 28, RULE_oddEven = 29, RULE_edge = 30, 
		RULE_node = 31, RULE_hexSetup = 32, RULE_hexRow = 33, RULE_evenHexRow = 34, 
		RULE_oddHexRow = 35, RULE_locationSetup = 36, RULE_locationRow = 37, RULE_noLocation = 38, 
		RULE_locationAssignment = 39, RULE_evenLocationRow = 40, RULE_oddLocationRow = 41, 
		RULE_chitSetup = 42, RULE_chitRow = 43, RULE_noChit = 44, RULE_chitFromBag = 45, 
		RULE_chit = 46, RULE_evenChitRow = 47, RULE_oddChitRow = 48, RULE_portsSetup = 49, 
		RULE_portAtEdge = 50, RULE_players = 51, RULE_player = 52, RULE_server = 53, 
		RULE_client = 54, RULE_setupPlayerOption = 55, RULE_hand = 56, RULE_stock = 57, 
		RULE_stockItem = 58, RULE_devCards = 59, RULE_ports = 60, RULE_victoryPoints = 61, 
		RULE_towns = 62, RULE_cities = 63, RULE_roads = 64, RULE_placementItem = 65, 
		RULE_placements = 66, RULE_buildAction = 67, RULE_turns = 68, RULE_turn = 69, 
		RULE_turnItem = 70, RULE_action = 71, RULE_build = 72, RULE_endTurn = 73, 
		RULE_buildCity = 74, RULE_buildShip = 75, RULE_buildRoad = 76, RULE_buildTown = 77, 
		RULE_moveRobber = 78, RULE_rollDice = 79, RULE_dice = 80, RULE_roll = 81, 
		RULE_playerProduction = 82, RULE_production = 83, RULE_moveShip = 84, 
		RULE_offerTrade = 85, RULE_acceptOffer = 86, RULE_rejectOffer = 87, RULE_counterOffer = 88, 
		RULE_tradePlayer = 89, RULE_looseResources = 90, RULE_robPlayer = 91, 
		RULE_buyDevelopmentCard = 92, RULE_playDevelopmentCard = 93, RULE_playDevelopmentCardExpression = 94, 
		RULE_playSoldier = 95, RULE_playVictoryPoint = 96, RULE_playRoadBuilding = 97, 
		RULE_playMonopoly = 98, RULE_playYearOfPlenty = 99, RULE_checkItem = 100, 
		RULE_checkPrefix = 101, RULE_precision = 102, RULE_atLeast = 103, RULE_moreThen = 104, 
		RULE_moreThenOrEqual = 105, RULE_exactly = 106, RULE_lessThen = 107, RULE_lessThenOrEqual = 108, 
		RULE_not = 109, RULE_check = 110, RULE_hasResources = 111, RULE_hasAmountPiecesInStock = 112, 
		RULE_isNotOnTurn = 113, RULE_isOnTurn = 114, RULE_hasRoadAt = 115, RULE_hasTownAt = 116, 
		RULE_hasXRoads = 117, RULE_resourceSet = 118, RULE_resource = 119, RULE_sheep = 120, 
		RULE_timber = 121, RULE_wheat = 122, RULE_ore = 123, RULE_brick = 124, 
		RULE_unknown = 125, RULE_piece = 126, RULE_town = 127, RULE_city = 128, 
		RULE_ship = 129, RULE_road = 130, RULE_devCard = 131, RULE_soldier = 132, 
		RULE_monopoly = 133, RULE_roadBuilding = 134, RULE_victoryPoint = 135, 
		RULE_yearOfPlenty = 136, RULE_port = 137, RULE_portPrefix = 138, RULE_any3To1Port = 139, 
		RULE_any4To1Port = 140, RULE_brick2To1Port = 141, RULE_wheat2To1Port = 142, 
		RULE_timber2To1Port = 143, RULE_ore2To1Port = 144, RULE_sheep2To1Port = 145, 
		RULE_fromBagPort = 146, RULE_hex = 147, RULE_pasture = 148, RULE_forest = 149, 
		RULE_mountain = 150, RULE_river = 151, RULE_wheatField = 152, RULE_sea = 153, 
		RULE_none = 154, RULE_desert = 155, RULE_victoryPointt = 156, RULE_longestRoad = 157, 
		RULE_largestArmy = 158, RULE_roadBuildingToken = 159;
	public static final String[] ruleNames = {
		"at", "times", "script", "game", "gameOptions", "gameOption", "robber", 
		"pirate", "placementSequence", "board", "boardOption", "hexesBag", "portsBag", 
		"chitsBag", "layout2D", "coord", "x", "y", "z", "coord3D", "row", "column", 
		"coord2D", "coord1D", "orientation", "pointy", "flat", "odd", "even", 
		"oddEven", "edge", "node", "hexSetup", "hexRow", "evenHexRow", "oddHexRow", 
		"locationSetup", "locationRow", "noLocation", "locationAssignment", "evenLocationRow", 
		"oddLocationRow", "chitSetup", "chitRow", "noChit", "chitFromBag", "chit", 
		"evenChitRow", "oddChitRow", "portsSetup", "portAtEdge", "players", "player", 
		"server", "client", "setupPlayerOption", "hand", "stock", "stockItem", 
		"devCards", "ports", "victoryPoints", "towns", "cities", "roads", "placementItem", 
		"placements", "buildAction", "turns", "turn", "turnItem", "action", "build", 
		"endTurn", "buildCity", "buildShip", "buildRoad", "buildTown", "moveRobber", 
		"rollDice", "dice", "roll", "playerProduction", "production", "moveShip", 
		"offerTrade", "acceptOffer", "rejectOffer", "counterOffer", "tradePlayer", 
		"looseResources", "robPlayer", "buyDevelopmentCard", "playDevelopmentCard", 
		"playDevelopmentCardExpression", "playSoldier", "playVictoryPoint", "playRoadBuilding", 
		"playMonopoly", "playYearOfPlenty", "checkItem", "checkPrefix", "precision", 
		"atLeast", "moreThen", "moreThenOrEqual", "exactly", "lessThen", "lessThenOrEqual", 
		"not", "check", "hasResources", "hasAmountPiecesInStock", "isNotOnTurn", 
		"isOnTurn", "hasRoadAt", "hasTownAt", "hasXRoads", "resourceSet", "resource", 
		"sheep", "timber", "wheat", "ore", "brick", "unknown", "piece", "town", 
		"city", "ship", "road", "devCard", "soldier", "monopoly", "roadBuilding", 
		"victoryPoint", "yearOfPlenty", "port", "portPrefix", "any3To1Port", "any4To1Port", 
		"brick2To1Port", "wheat2To1Port", "timber2To1Port", "ore2To1Port", "sheep2To1Port", 
		"fromBagPort", "hex", "pasture", "forest", "mountain", "river", "wheatField", 
		"sea", "none", "desert", "victoryPointt", "longestRoad", "largestArmy", 
		"roadBuildingToken"
	};

	private static final String[] _LITERAL_NAMES = {
		null, "'at'", "'@'", "'x'", "'game'", "'options'", "'robber'", "'pirate'", 
		"'standard'", "'standardWithCities'", "'seaFarers'", "'board'", "'hexesBag:'", 
		"'['", "']'", "'portsBag:'", "'chitsBag:'", "'system2D:'", "','", "'pointy'", 
		"'flat'", "'odd'", "'even'", "'|'", "'hexes'", "'locationIds'", "'..'", 
		"'chits'", "'ports'", "'player'", "'p'", "'server'", "'s'", "'.'", "'client'", 
		"'c'", "'hand'", "'stock'", "'devCards'", "'victoryPoints'", "'towns'", 
		"'cities'", "'roads'", "'placement'", "'and gains'", "'turns'", "'turn'", 
		"'builds'", "'build'", "'ends turn'", "'moves'", "'to'", "'rolls'", "'moves ship from'", 
		"'offers'", "'for'", "'accepts offer from'", "'rejects offer from'", "'counter-offers'", 
		"'trades'", "'with'", "'looses'", "'robs'", "'and steals'", "'buys a development card'", 
		"'plays a'", "'on'", "'v/'", "'check'", "'at least'", "'more then'", "'>'", 
		"'more then or equal'", "'>='", "'exactly'", "'='", "'less then'", "'<'", 
		"'less then or equal'", "'<='", "'not'", "'!'", "'has'", "'in stock'", 
		"'is not on turn'", "'is on turn'", "'has road'", "'has town'", "'hasXRoads:'", 
		"'\uD83D\uDC11'", "'sheep'", "'\uD83C\uDF32'", "'timber'", "'t'", "'\uD83C\uDF3E'", 
		"'wheat'", "'w'", "'\u26F0'", "'ore'", "'o'", "'\u268C'", "'brick'", "'b'", 
		"'?'", "'unknown'", "'\uD83C\uDFE0'", "'town'", "'\u26EA'", "'city'", 
		"'\u26F5'", "'ship'", "'\uD83D\uDEE3'", "'road'", "'soldier'", "'m'", 
		"'monopoly'", "'rb'", "'roadBuilding'", "'vp'", "'victoryPoint'", "'yop'", 
		"'yearOfPlenty'", "'port'", "'any3:1Port'", "'3:1'", "'any4:1Port'", "'4:1'", 
		"'brick2:1Port'", "'wheat2:1Port'", "'timber2:1Port'", "'ore2:1Port'", 
		"'sheep2:1Port'", "'fromBagPort'", "'pasture'", "'P'", "'F'", "'mountain'", 
		"'M'", "'river'", "'R'", "'field'", "'W'", "'sea'", "'S'", "'none'", "'desert'", 
		"'D'", "'lr'", "'longestRoad'", "'la'", "'largestArmy'", "'rbt'", "'token'", 
		null, null, null, "' '", "'\uD83D\uDD28'", "'\uD83C\uDFB2'", "'\u2693'", 
		"'\u2714'", "'\uFE0F'", "'\u2394'", "'\u2B21'", "'\u0C30'", "'\u00D7'"
	};
	private static final String[] _SYMBOLIC_NAMES = {
		null, null, null, null, null, null, null, null, null, null, null, null, 
		null, null, null, null, null, null, null, null, null, null, null, null, 
		null, null, null, null, null, null, null, null, null, null, null, null, 
		null, null, null, null, null, null, null, null, null, null, null, null, 
		null, null, null, null, null, null, null, null, null, null, null, null, 
		null, null, null, null, null, null, null, null, null, null, null, null, 
		null, null, null, null, null, null, null, null, null, null, null, null, 
		null, null, null, null, null, null, null, null, null, null, null, null, 
		null, null, null, null, null, null, null, null, null, null, null, null, 
		null, null, null, null, null, null, null, null, null, null, null, null, 
		null, null, null, null, null, null, null, null, null, null, null, null, 
		null, null, null, null, null, null, null, null, null, null, null, null, 
		null, null, null, null, null, null, null, null, null, "NUMBER", "NL", 
		"INDENT", "SPACE", "U_BUILD", "U_DICE", "U_PORT", "U_CHECK", "U_CHECK_GREEN", 
		"U_FLAT", "U_POINTY", "U_BAG", "U_X", "NODEDOT"
	};
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "jsettlers.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public jsettlersParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}
	public static class AtContext extends ParserRuleContext {
		public AtContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_at; }
	}

	public final AtContext at() throws RecognitionException {
		AtContext _localctx = new AtContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_at);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(320);
			_la = _input.LA(1);
			if ( !(_la==T__0 || _la==T__1) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class TimesContext extends ParserRuleContext {
		public TerminalNode U_X() { return getToken(jsettlersParser.U_X, 0); }
		public TimesContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_times; }
	}

	public final TimesContext times() throws RecognitionException {
		TimesContext _localctx = new TimesContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_times);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(322);
			_la = _input.LA(1);
			if ( !(_la==T__2 || _la==U_X) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ScriptContext extends ParserRuleContext {
		public GameContext game() {
			return getRuleContext(GameContext.class,0);
		}
		public PlacementsContext placements() {
			return getRuleContext(PlacementsContext.class,0);
		}
		public TurnsContext turns() {
			return getRuleContext(TurnsContext.class,0);
		}
		public TerminalNode EOF() { return getToken(jsettlersParser.EOF, 0); }
		public ScriptContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_script; }
	}

	public final ScriptContext script() throws RecognitionException {
		ScriptContext _localctx = new ScriptContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_script);
		try {
			enterOuterAlt(_localctx, 1);
			{
			{
			setState(324);
			game();
			setState(325);
			placements();
			setState(326);
			turns();
			}
			setState(329);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,0,_ctx) ) {
			case 1:
				{
				setState(328);
				match(EOF);
				}
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class GameContext extends ParserRuleContext {
		public List<TerminalNode> NL() { return getTokens(jsettlersParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(jsettlersParser.NL, i);
		}
		public GameOptionsContext gameOptions() {
			return getRuleContext(GameOptionsContext.class,0);
		}
		public BoardContext board() {
			return getRuleContext(BoardContext.class,0);
		}
		public List<PlayersContext> players() {
			return getRuleContexts(PlayersContext.class);
		}
		public PlayersContext players(int i) {
			return getRuleContext(PlayersContext.class,i);
		}
		public GameContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_game; }
	}

	public final GameContext game() throws RecognitionException {
		GameContext _localctx = new GameContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_game);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(331);
			match(T__3);
			setState(332);
			match(NL);
			setState(336);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,1,_ctx) ) {
			case 1:
				{
				setState(333);
				gameOptions();
				setState(334);
				match(NL);
				}
				break;
			}
			setState(341);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,2,_ctx) ) {
			case 1:
				{
				setState(338);
				board();
				setState(339);
				match(NL);
				}
				break;
			}
			setState(346); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(343);
				players();
				setState(344);
				match(NL);
				}
				}
				setState(348); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==INDENT );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class GameOptionsContext extends ParserRuleContext {
		public List<TerminalNode> INDENT() { return getTokens(jsettlersParser.INDENT); }
		public TerminalNode INDENT(int i) {
			return getToken(jsettlersParser.INDENT, i);
		}
		public List<TerminalNode> NL() { return getTokens(jsettlersParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(jsettlersParser.NL, i);
		}
		public List<GameOptionContext> gameOption() {
			return getRuleContexts(GameOptionContext.class);
		}
		public GameOptionContext gameOption(int i) {
			return getRuleContext(GameOptionContext.class,i);
		}
		public GameOptionsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_gameOptions; }
	}

	public final GameOptionsContext gameOptions() throws RecognitionException {
		GameOptionsContext _localctx = new GameOptionsContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_gameOptions);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(350);
			match(INDENT);
			setState(351);
			match(T__4);
			setState(352);
			match(NL);
			setState(360);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==INDENT) {
				{
				{
				setState(353);
				match(INDENT);
				setState(354);
				match(INDENT);
				setState(355);
				gameOption();
				setState(356);
				match(NL);
				}
				}
				setState(362);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class GameOptionContext extends ParserRuleContext {
		public StockContext stock() {
			return getRuleContext(StockContext.class,0);
		}
		public PirateContext pirate() {
			return getRuleContext(PirateContext.class,0);
		}
		public BoardContext board() {
			return getRuleContext(BoardContext.class,0);
		}
		public RobberContext robber() {
			return getRuleContext(RobberContext.class,0);
		}
		public PlacementSequenceContext placementSequence() {
			return getRuleContext(PlacementSequenceContext.class,0);
		}
		public GameOptionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_gameOption; }
	}

	public final GameOptionContext gameOption() throws RecognitionException {
		GameOptionContext _localctx = new GameOptionContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_gameOption);
		try {
			setState(368);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__36:
				enterOuterAlt(_localctx, 1);
				{
				setState(363);
				stock();
				}
				break;
			case T__6:
				enterOuterAlt(_localctx, 2);
				{
				setState(364);
				pirate();
				}
				break;
			case INDENT:
				enterOuterAlt(_localctx, 3);
				{
				setState(365);
				board();
				}
				break;
			case T__5:
				enterOuterAlt(_localctx, 4);
				{
				setState(366);
				robber();
				}
				break;
			case T__7:
			case T__8:
			case T__9:
				enterOuterAlt(_localctx, 5);
				{
				setState(367);
				placementSequence();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class RobberContext extends ParserRuleContext {
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public AtContext at() {
			return getRuleContext(AtContext.class,0);
		}
		public CoordContext coord() {
			return getRuleContext(CoordContext.class,0);
		}
		public RobberContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_robber; }
	}

	public final RobberContext robber() throws RecognitionException {
		RobberContext _localctx = new RobberContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_robber);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(370);
			match(T__5);
			setState(373);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,6,_ctx) ) {
			case 1:
				{
				setState(371);
				match(SPACE);
				setState(372);
				at();
				}
				break;
			}
			setState(377);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,7,_ctx) ) {
			case 1:
				{
				setState(375);
				match(SPACE);
				setState(376);
				coord();
				}
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PirateContext extends ParserRuleContext {
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public AtContext at() {
			return getRuleContext(AtContext.class,0);
		}
		public CoordContext coord() {
			return getRuleContext(CoordContext.class,0);
		}
		public PirateContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_pirate; }
	}

	public final PirateContext pirate() throws RecognitionException {
		PirateContext _localctx = new PirateContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_pirate);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(379);
			match(T__6);
			setState(382);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,8,_ctx) ) {
			case 1:
				{
				setState(380);
				match(SPACE);
				setState(381);
				at();
				}
				break;
			}
			setState(386);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==SPACE) {
				{
				setState(384);
				match(SPACE);
				setState(385);
				coord();
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PlacementSequenceContext extends ParserRuleContext {
		public PlacementSequenceContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_placementSequence; }
	}

	public final PlacementSequenceContext placementSequence() throws RecognitionException {
		PlacementSequenceContext _localctx = new PlacementSequenceContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_placementSequence);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(388);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__7) | (1L << T__8) | (1L << T__9))) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class BoardContext extends ParserRuleContext {
		public List<TerminalNode> INDENT() { return getTokens(jsettlersParser.INDENT); }
		public TerminalNode INDENT(int i) {
			return getToken(jsettlersParser.INDENT, i);
		}
		public List<TerminalNode> NL() { return getTokens(jsettlersParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(jsettlersParser.NL, i);
		}
		public List<BoardOptionContext> boardOption() {
			return getRuleContexts(BoardOptionContext.class);
		}
		public BoardOptionContext boardOption(int i) {
			return getRuleContext(BoardOptionContext.class,i);
		}
		public BoardContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_board; }
	}

	public final BoardContext board() throws RecognitionException {
		BoardContext _localctx = new BoardContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_board);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(390);
			match(INDENT);
			setState(391);
			match(T__10);
			setState(392);
			match(NL);
			setState(400);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==INDENT) {
				{
				{
				setState(393);
				match(INDENT);
				setState(394);
				match(INDENT);
				setState(395);
				boardOption();
				setState(396);
				match(NL);
				}
				}
				setState(402);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class BoardOptionContext extends ParserRuleContext {
		public Layout2DContext layout2D() {
			return getRuleContext(Layout2DContext.class,0);
		}
		public HexSetupContext hexSetup() {
			return getRuleContext(HexSetupContext.class,0);
		}
		public LocationSetupContext locationSetup() {
			return getRuleContext(LocationSetupContext.class,0);
		}
		public ChitSetupContext chitSetup() {
			return getRuleContext(ChitSetupContext.class,0);
		}
		public PortsSetupContext portsSetup() {
			return getRuleContext(PortsSetupContext.class,0);
		}
		public HexesBagContext hexesBag() {
			return getRuleContext(HexesBagContext.class,0);
		}
		public PortsBagContext portsBag() {
			return getRuleContext(PortsBagContext.class,0);
		}
		public ChitsBagContext chitsBag() {
			return getRuleContext(ChitsBagContext.class,0);
		}
		public BoardOptionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_boardOption; }
	}

	public final BoardOptionContext boardOption() throws RecognitionException {
		BoardOptionContext _localctx = new BoardOptionContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_boardOption);
		try {
			setState(411);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__16:
				enterOuterAlt(_localctx, 1);
				{
				setState(403);
				layout2D();
				}
				break;
			case T__23:
				enterOuterAlt(_localctx, 2);
				{
				setState(404);
				hexSetup();
				}
				break;
			case T__24:
				enterOuterAlt(_localctx, 3);
				{
				setState(405);
				locationSetup();
				}
				break;
			case T__26:
				enterOuterAlt(_localctx, 4);
				{
				setState(406);
				chitSetup();
				}
				break;
			case T__27:
				enterOuterAlt(_localctx, 5);
				{
				setState(407);
				portsSetup();
				}
				break;
			case T__11:
				enterOuterAlt(_localctx, 6);
				{
				setState(408);
				hexesBag();
				}
				break;
			case T__14:
				enterOuterAlt(_localctx, 7);
				{
				setState(409);
				portsBag();
				}
				break;
			case T__15:
				enterOuterAlt(_localctx, 8);
				{
				setState(410);
				chitsBag();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class HexesBagContext extends ParserRuleContext {
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public List<TerminalNode> NUMBER() { return getTokens(jsettlersParser.NUMBER); }
		public TerminalNode NUMBER(int i) {
			return getToken(jsettlersParser.NUMBER, i);
		}
		public List<HexContext> hex() {
			return getRuleContexts(HexContext.class);
		}
		public HexContext hex(int i) {
			return getRuleContext(HexContext.class,i);
		}
		public HexesBagContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_hexesBag; }
	}

	public final HexesBagContext hexesBag() throws RecognitionException {
		HexesBagContext _localctx = new HexesBagContext(_ctx, getState());
		enterRule(_localctx, 22, RULE_hexesBag);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(413);
			match(T__11);
			setState(414);
			match(SPACE);
			setState(415);
			match(T__12);
			setState(426);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==NUMBER) {
				{
				{
				setState(416);
				match(NUMBER);
				setState(417);
				match(SPACE);
				setState(418);
				match(T__2);
				setState(419);
				match(SPACE);
				setState(420);
				hex();
				setState(422);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==SPACE) {
					{
					setState(421);
					match(SPACE);
					}
				}

				}
				}
				setState(428);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(429);
			match(T__13);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PortsBagContext extends ParserRuleContext {
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public TerminalNode NUMBER() { return getToken(jsettlersParser.NUMBER, 0); }
		public PortContext port() {
			return getRuleContext(PortContext.class,0);
		}
		public PortsBagContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_portsBag; }
	}

	public final PortsBagContext portsBag() throws RecognitionException {
		PortsBagContext _localctx = new PortsBagContext(_ctx, getState());
		enterRule(_localctx, 24, RULE_portsBag);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(431);
			match(T__14);
			setState(432);
			match(SPACE);
			setState(433);
			match(NUMBER);
			setState(434);
			match(SPACE);
			setState(435);
			match(T__2);
			setState(436);
			match(SPACE);
			setState(437);
			port();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ChitsBagContext extends ParserRuleContext {
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public TerminalNode NUMBER() { return getToken(jsettlersParser.NUMBER, 0); }
		public ChitContext chit() {
			return getRuleContext(ChitContext.class,0);
		}
		public ChitsBagContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_chitsBag; }
	}

	public final ChitsBagContext chitsBag() throws RecognitionException {
		ChitsBagContext _localctx = new ChitsBagContext(_ctx, getState());
		enterRule(_localctx, 26, RULE_chitsBag);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(439);
			match(T__15);
			setState(440);
			match(SPACE);
			setState(441);
			match(NUMBER);
			setState(442);
			match(SPACE);
			setState(443);
			match(T__2);
			setState(444);
			match(SPACE);
			setState(445);
			chit();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Layout2DContext extends ParserRuleContext {
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public OrientationContext orientation() {
			return getRuleContext(OrientationContext.class,0);
		}
		public OddEvenContext oddEven() {
			return getRuleContext(OddEvenContext.class,0);
		}
		public Layout2DContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_layout2D; }
	}

	public final Layout2DContext layout2D() throws RecognitionException {
		Layout2DContext _localctx = new Layout2DContext(_ctx, getState());
		enterRule(_localctx, 28, RULE_layout2D);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(447);
			match(T__16);
			setState(448);
			match(SPACE);
			setState(449);
			orientation();
			setState(450);
			match(SPACE);
			setState(451);
			oddEven();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class CoordContext extends ParserRuleContext {
		public Coord3DContext coord3D() {
			return getRuleContext(Coord3DContext.class,0);
		}
		public Coord2DContext coord2D() {
			return getRuleContext(Coord2DContext.class,0);
		}
		public Coord1DContext coord1D() {
			return getRuleContext(Coord1DContext.class,0);
		}
		public CoordContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_coord; }
	}

	public final CoordContext coord() throws RecognitionException {
		CoordContext _localctx = new CoordContext(_ctx, getState());
		enterRule(_localctx, 30, RULE_coord);
		try {
			setState(456);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,14,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(453);
				coord3D();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(454);
				coord2D();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(455);
				coord1D();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class XContext extends ParserRuleContext {
		public TerminalNode NUMBER() { return getToken(jsettlersParser.NUMBER, 0); }
		public XContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_x; }
	}

	public final XContext x() throws RecognitionException {
		XContext _localctx = new XContext(_ctx, getState());
		enterRule(_localctx, 32, RULE_x);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(458);
			match(NUMBER);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class YContext extends ParserRuleContext {
		public TerminalNode NUMBER() { return getToken(jsettlersParser.NUMBER, 0); }
		public YContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_y; }
	}

	public final YContext y() throws RecognitionException {
		YContext _localctx = new YContext(_ctx, getState());
		enterRule(_localctx, 34, RULE_y);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(460);
			match(NUMBER);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ZContext extends ParserRuleContext {
		public TerminalNode NUMBER() { return getToken(jsettlersParser.NUMBER, 0); }
		public ZContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_z; }
	}

	public final ZContext z() throws RecognitionException {
		ZContext _localctx = new ZContext(_ctx, getState());
		enterRule(_localctx, 36, RULE_z);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(462);
			match(NUMBER);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Coord3DContext extends ParserRuleContext {
		public XContext x() {
			return getRuleContext(XContext.class,0);
		}
		public YContext y() {
			return getRuleContext(YContext.class,0);
		}
		public ZContext z() {
			return getRuleContext(ZContext.class,0);
		}
		public Coord3DContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_coord3D; }
	}

	public final Coord3DContext coord3D() throws RecognitionException {
		Coord3DContext _localctx = new Coord3DContext(_ctx, getState());
		enterRule(_localctx, 38, RULE_coord3D);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(464);
			x();
			setState(465);
			match(T__17);
			setState(466);
			y();
			setState(467);
			match(T__17);
			setState(468);
			z();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class RowContext extends ParserRuleContext {
		public TerminalNode NUMBER() { return getToken(jsettlersParser.NUMBER, 0); }
		public RowContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_row; }
	}

	public final RowContext row() throws RecognitionException {
		RowContext _localctx = new RowContext(_ctx, getState());
		enterRule(_localctx, 40, RULE_row);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(470);
			match(NUMBER);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ColumnContext extends ParserRuleContext {
		public TerminalNode NUMBER() { return getToken(jsettlersParser.NUMBER, 0); }
		public ColumnContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_column; }
	}

	public final ColumnContext column() throws RecognitionException {
		ColumnContext _localctx = new ColumnContext(_ctx, getState());
		enterRule(_localctx, 42, RULE_column);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(472);
			match(NUMBER);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Coord2DContext extends ParserRuleContext {
		public RowContext row() {
			return getRuleContext(RowContext.class,0);
		}
		public ColumnContext column() {
			return getRuleContext(ColumnContext.class,0);
		}
		public Coord2DContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_coord2D; }
	}

	public final Coord2DContext coord2D() throws RecognitionException {
		Coord2DContext _localctx = new Coord2DContext(_ctx, getState());
		enterRule(_localctx, 44, RULE_coord2D);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(474);
			row();
			setState(475);
			match(T__17);
			setState(476);
			column();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Coord1DContext extends ParserRuleContext {
		public TerminalNode NUMBER() { return getToken(jsettlersParser.NUMBER, 0); }
		public Coord1DContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_coord1D; }
	}

	public final Coord1DContext coord1D() throws RecognitionException {
		Coord1DContext _localctx = new Coord1DContext(_ctx, getState());
		enterRule(_localctx, 46, RULE_coord1D);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(478);
			match(NUMBER);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class OrientationContext extends ParserRuleContext {
		public PointyContext pointy() {
			return getRuleContext(PointyContext.class,0);
		}
		public FlatContext flat() {
			return getRuleContext(FlatContext.class,0);
		}
		public OrientationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_orientation; }
	}

	public final OrientationContext orientation() throws RecognitionException {
		OrientationContext _localctx = new OrientationContext(_ctx, getState());
		enterRule(_localctx, 48, RULE_orientation);
		try {
			setState(482);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__18:
			case U_POINTY:
				enterOuterAlt(_localctx, 1);
				{
				setState(480);
				pointy();
				}
				break;
			case T__19:
			case U_FLAT:
				enterOuterAlt(_localctx, 2);
				{
				setState(481);
				flat();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PointyContext extends ParserRuleContext {
		public TerminalNode U_POINTY() { return getToken(jsettlersParser.U_POINTY, 0); }
		public PointyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_pointy; }
	}

	public final PointyContext pointy() throws RecognitionException {
		PointyContext _localctx = new PointyContext(_ctx, getState());
		enterRule(_localctx, 50, RULE_pointy);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(484);
			_la = _input.LA(1);
			if ( !(_la==T__18 || _la==U_POINTY) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class FlatContext extends ParserRuleContext {
		public TerminalNode U_FLAT() { return getToken(jsettlersParser.U_FLAT, 0); }
		public FlatContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_flat; }
	}

	public final FlatContext flat() throws RecognitionException {
		FlatContext _localctx = new FlatContext(_ctx, getState());
		enterRule(_localctx, 52, RULE_flat);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(486);
			_la = _input.LA(1);
			if ( !(_la==T__19 || _la==U_FLAT) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class OddContext extends ParserRuleContext {
		public OddContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_odd; }
	}

	public final OddContext odd() throws RecognitionException {
		OddContext _localctx = new OddContext(_ctx, getState());
		enterRule(_localctx, 54, RULE_odd);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(488);
			match(T__20);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class EvenContext extends ParserRuleContext {
		public EvenContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_even; }
	}

	public final EvenContext even() throws RecognitionException {
		EvenContext _localctx = new EvenContext(_ctx, getState());
		enterRule(_localctx, 56, RULE_even);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(490);
			match(T__21);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class OddEvenContext extends ParserRuleContext {
		public OddContext odd() {
			return getRuleContext(OddContext.class,0);
		}
		public EvenContext even() {
			return getRuleContext(EvenContext.class,0);
		}
		public OddEvenContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_oddEven; }
	}

	public final OddEvenContext oddEven() throws RecognitionException {
		OddEvenContext _localctx = new OddEvenContext(_ctx, getState());
		enterRule(_localctx, 58, RULE_oddEven);
		try {
			setState(494);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__20:
				enterOuterAlt(_localctx, 1);
				{
				setState(492);
				odd();
				}
				break;
			case T__21:
				enterOuterAlt(_localctx, 2);
				{
				setState(493);
				even();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class EdgeContext extends ParserRuleContext {
		public List<CoordContext> coord() {
			return getRuleContexts(CoordContext.class);
		}
		public CoordContext coord(int i) {
			return getRuleContext(CoordContext.class,i);
		}
		public EdgeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_edge; }
	}

	public final EdgeContext edge() throws RecognitionException {
		EdgeContext _localctx = new EdgeContext(_ctx, getState());
		enterRule(_localctx, 60, RULE_edge);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(496);
			coord();
			setState(497);
			match(T__22);
			setState(498);
			coord();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class NodeContext extends ParserRuleContext {
		public List<CoordContext> coord() {
			return getRuleContexts(CoordContext.class);
		}
		public CoordContext coord(int i) {
			return getRuleContext(CoordContext.class,i);
		}
		public List<TerminalNode> NODEDOT() { return getTokens(jsettlersParser.NODEDOT); }
		public TerminalNode NODEDOT(int i) {
			return getToken(jsettlersParser.NODEDOT, i);
		}
		public NodeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_node; }
	}

	public final NodeContext node() throws RecognitionException {
		NodeContext _localctx = new NodeContext(_ctx, getState());
		enterRule(_localctx, 62, RULE_node);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(500);
			coord();
			setState(501);
			match(NODEDOT);
			setState(502);
			coord();
			setState(503);
			match(NODEDOT);
			setState(504);
			coord();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class HexSetupContext extends ParserRuleContext {
		public List<TerminalNode> NL() { return getTokens(jsettlersParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(jsettlersParser.NL, i);
		}
		public List<TerminalNode> INDENT() { return getTokens(jsettlersParser.INDENT); }
		public TerminalNode INDENT(int i) {
			return getToken(jsettlersParser.INDENT, i);
		}
		public List<HexRowContext> hexRow() {
			return getRuleContexts(HexRowContext.class);
		}
		public HexRowContext hexRow(int i) {
			return getRuleContext(HexRowContext.class,i);
		}
		public HexSetupContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_hexSetup; }
	}

	public final HexSetupContext hexSetup() throws RecognitionException {
		HexSetupContext _localctx = new HexSetupContext(_ctx, getState());
		enterRule(_localctx, 64, RULE_hexSetup);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(506);
			match(T__23);
			setState(507);
			match(NL);
			setState(516);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==INDENT) {
				{
				{
				setState(508);
				match(INDENT);
				setState(509);
				match(INDENT);
				setState(510);
				match(INDENT);
				setState(511);
				hexRow();
				setState(512);
				match(NL);
				}
				}
				setState(518);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class HexRowContext extends ParserRuleContext {
		public EvenHexRowContext evenHexRow() {
			return getRuleContext(EvenHexRowContext.class,0);
		}
		public OddHexRowContext oddHexRow() {
			return getRuleContext(OddHexRowContext.class,0);
		}
		public HexRowContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_hexRow; }
	}

	public final HexRowContext hexRow() throws RecognitionException {
		HexRowContext _localctx = new HexRowContext(_ctx, getState());
		enterRule(_localctx, 66, RULE_hexRow);
		try {
			setState(521);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__32:
			case T__91:
			case T__132:
			case T__133:
			case T__134:
			case T__135:
			case T__136:
			case T__137:
			case T__138:
			case T__139:
			case T__140:
			case T__141:
			case T__142:
			case T__143:
			case T__144:
			case T__145:
				enterOuterAlt(_localctx, 1);
				{
				setState(519);
				evenHexRow();
				}
				break;
			case SPACE:
				enterOuterAlt(_localctx, 2);
				{
				setState(520);
				oddHexRow();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class EvenHexRowContext extends ParserRuleContext {
		public List<HexContext> hex() {
			return getRuleContexts(HexContext.class);
		}
		public HexContext hex(int i) {
			return getRuleContext(HexContext.class,i);
		}
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public EvenHexRowContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_evenHexRow; }
	}

	public final EvenHexRowContext evenHexRow() throws RecognitionException {
		EvenHexRowContext _localctx = new EvenHexRowContext(_ctx, getState());
		enterRule(_localctx, 68, RULE_evenHexRow);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(523);
			hex();
			setState(526); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(524);
				match(SPACE);
				setState(525);
				hex();
				}
				}
				setState(528); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==SPACE );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class OddHexRowContext extends ParserRuleContext {
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public List<HexContext> hex() {
			return getRuleContexts(HexContext.class);
		}
		public HexContext hex(int i) {
			return getRuleContext(HexContext.class,i);
		}
		public OddHexRowContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_oddHexRow; }
	}

	public final OddHexRowContext oddHexRow() throws RecognitionException {
		OddHexRowContext _localctx = new OddHexRowContext(_ctx, getState());
		enterRule(_localctx, 70, RULE_oddHexRow);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(532); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(530);
				match(SPACE);
				setState(531);
				hex();
				}
				}
				setState(534); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==SPACE );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class LocationSetupContext extends ParserRuleContext {
		public List<TerminalNode> NL() { return getTokens(jsettlersParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(jsettlersParser.NL, i);
		}
		public List<TerminalNode> INDENT() { return getTokens(jsettlersParser.INDENT); }
		public TerminalNode INDENT(int i) {
			return getToken(jsettlersParser.INDENT, i);
		}
		public List<LocationRowContext> locationRow() {
			return getRuleContexts(LocationRowContext.class);
		}
		public LocationRowContext locationRow(int i) {
			return getRuleContext(LocationRowContext.class,i);
		}
		public LocationSetupContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_locationSetup; }
	}

	public final LocationSetupContext locationSetup() throws RecognitionException {
		LocationSetupContext _localctx = new LocationSetupContext(_ctx, getState());
		enterRule(_localctx, 72, RULE_locationSetup);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(536);
			match(T__24);
			setState(537);
			match(NL);
			setState(546);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==INDENT) {
				{
				{
				setState(538);
				match(INDENT);
				setState(539);
				match(INDENT);
				setState(540);
				match(INDENT);
				setState(541);
				locationRow();
				setState(542);
				match(NL);
				}
				}
				setState(548);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class LocationRowContext extends ParserRuleContext {
		public EvenLocationRowContext evenLocationRow() {
			return getRuleContext(EvenLocationRowContext.class,0);
		}
		public OddLocationRowContext oddLocationRow() {
			return getRuleContext(OddLocationRowContext.class,0);
		}
		public LocationRowContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_locationRow; }
	}

	public final LocationRowContext locationRow() throws RecognitionException {
		LocationRowContext _localctx = new LocationRowContext(_ctx, getState());
		enterRule(_localctx, 74, RULE_locationRow);
		try {
			setState(551);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case SPACE:
				enterOuterAlt(_localctx, 1);
				{
				setState(549);
				evenLocationRow();
				}
				break;
			case T__25:
			case NUMBER:
				enterOuterAlt(_localctx, 2);
				{
				setState(550);
				oddLocationRow();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class NoLocationContext extends ParserRuleContext {
		public NoLocationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_noLocation; }
	}

	public final NoLocationContext noLocation() throws RecognitionException {
		NoLocationContext _localctx = new NoLocationContext(_ctx, getState());
		enterRule(_localctx, 76, RULE_noLocation);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(553);
			match(T__25);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class LocationAssignmentContext extends ParserRuleContext {
		public TerminalNode NUMBER() { return getToken(jsettlersParser.NUMBER, 0); }
		public NoLocationContext noLocation() {
			return getRuleContext(NoLocationContext.class,0);
		}
		public LocationAssignmentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_locationAssignment; }
	}

	public final LocationAssignmentContext locationAssignment() throws RecognitionException {
		LocationAssignmentContext _localctx = new LocationAssignmentContext(_ctx, getState());
		enterRule(_localctx, 78, RULE_locationAssignment);
		try {
			setState(557);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case NUMBER:
				enterOuterAlt(_localctx, 1);
				{
				setState(555);
				match(NUMBER);
				}
				break;
			case T__25:
				enterOuterAlt(_localctx, 2);
				{
				setState(556);
				noLocation();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class EvenLocationRowContext extends ParserRuleContext {
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public List<LocationAssignmentContext> locationAssignment() {
			return getRuleContexts(LocationAssignmentContext.class);
		}
		public LocationAssignmentContext locationAssignment(int i) {
			return getRuleContext(LocationAssignmentContext.class,i);
		}
		public EvenLocationRowContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_evenLocationRow; }
	}

	public final EvenLocationRowContext evenLocationRow() throws RecognitionException {
		EvenLocationRowContext _localctx = new EvenLocationRowContext(_ctx, getState());
		enterRule(_localctx, 80, RULE_evenLocationRow);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(559);
			match(SPACE);
			setState(560);
			match(SPACE);
			setState(571); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(561);
				locationAssignment();
				setState(563);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,24,_ctx) ) {
				case 1:
					{
					setState(562);
					match(SPACE);
					}
					break;
				}
				setState(566);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,25,_ctx) ) {
				case 1:
					{
					setState(565);
					match(SPACE);
					}
					break;
				}
				setState(569);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==SPACE) {
					{
					setState(568);
					match(SPACE);
					}
				}

				}
				}
				setState(573); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==T__25 || _la==NUMBER );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class OddLocationRowContext extends ParserRuleContext {
		public List<LocationAssignmentContext> locationAssignment() {
			return getRuleContexts(LocationAssignmentContext.class);
		}
		public LocationAssignmentContext locationAssignment(int i) {
			return getRuleContext(LocationAssignmentContext.class,i);
		}
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public OddLocationRowContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_oddLocationRow; }
	}

	public final OddLocationRowContext oddLocationRow() throws RecognitionException {
		OddLocationRowContext _localctx = new OddLocationRowContext(_ctx, getState());
		enterRule(_localctx, 82, RULE_oddLocationRow);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(575);
			locationAssignment();
			setState(586); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(577);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,28,_ctx) ) {
				case 1:
					{
					setState(576);
					match(SPACE);
					}
					break;
				}
				setState(580);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,29,_ctx) ) {
				case 1:
					{
					setState(579);
					match(SPACE);
					}
					break;
				}
				setState(583);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==SPACE) {
					{
					setState(582);
					match(SPACE);
					}
				}

				setState(585);
				locationAssignment();
				}
				}
				setState(588); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==T__25 || _la==NUMBER || _la==SPACE );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ChitSetupContext extends ParserRuleContext {
		public List<TerminalNode> NL() { return getTokens(jsettlersParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(jsettlersParser.NL, i);
		}
		public List<TerminalNode> INDENT() { return getTokens(jsettlersParser.INDENT); }
		public TerminalNode INDENT(int i) {
			return getToken(jsettlersParser.INDENT, i);
		}
		public List<ChitRowContext> chitRow() {
			return getRuleContexts(ChitRowContext.class);
		}
		public ChitRowContext chitRow(int i) {
			return getRuleContext(ChitRowContext.class,i);
		}
		public ChitSetupContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_chitSetup; }
	}

	public final ChitSetupContext chitSetup() throws RecognitionException {
		ChitSetupContext _localctx = new ChitSetupContext(_ctx, getState());
		enterRule(_localctx, 84, RULE_chitSetup);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(590);
			match(T__26);
			setState(591);
			match(NL);
			setState(600);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==INDENT) {
				{
				{
				setState(592);
				match(INDENT);
				setState(593);
				match(INDENT);
				setState(594);
				match(INDENT);
				setState(595);
				chitRow();
				setState(596);
				match(NL);
				}
				}
				setState(602);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ChitRowContext extends ParserRuleContext {
		public EvenChitRowContext evenChitRow() {
			return getRuleContext(EvenChitRowContext.class,0);
		}
		public OddChitRowContext oddChitRow() {
			return getRuleContext(OddChitRowContext.class,0);
		}
		public ChitRowContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_chitRow; }
	}

	public final ChitRowContext chitRow() throws RecognitionException {
		ChitRowContext _localctx = new ChitRowContext(_ctx, getState());
		enterRule(_localctx, 86, RULE_chitRow);
		try {
			setState(605);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case SPACE:
				enterOuterAlt(_localctx, 1);
				{
				setState(603);
				evenChitRow();
				}
				break;
			case T__25:
			case NUMBER:
			case U_BAG:
				enterOuterAlt(_localctx, 2);
				{
				setState(604);
				oddChitRow();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class NoChitContext extends ParserRuleContext {
		public NoChitContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_noChit; }
	}

	public final NoChitContext noChit() throws RecognitionException {
		NoChitContext _localctx = new NoChitContext(_ctx, getState());
		enterRule(_localctx, 88, RULE_noChit);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(607);
			match(T__25);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ChitFromBagContext extends ParserRuleContext {
		public TerminalNode U_BAG() { return getToken(jsettlersParser.U_BAG, 0); }
		public ChitFromBagContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_chitFromBag; }
	}

	public final ChitFromBagContext chitFromBag() throws RecognitionException {
		ChitFromBagContext _localctx = new ChitFromBagContext(_ctx, getState());
		enterRule(_localctx, 90, RULE_chitFromBag);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(609);
			match(U_BAG);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ChitContext extends ParserRuleContext {
		public TerminalNode NUMBER() { return getToken(jsettlersParser.NUMBER, 0); }
		public NoChitContext noChit() {
			return getRuleContext(NoChitContext.class,0);
		}
		public ChitFromBagContext chitFromBag() {
			return getRuleContext(ChitFromBagContext.class,0);
		}
		public ChitContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_chit; }
	}

	public final ChitContext chit() throws RecognitionException {
		ChitContext _localctx = new ChitContext(_ctx, getState());
		enterRule(_localctx, 92, RULE_chit);
		try {
			setState(614);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case NUMBER:
				enterOuterAlt(_localctx, 1);
				{
				setState(611);
				match(NUMBER);
				}
				break;
			case T__25:
				enterOuterAlt(_localctx, 2);
				{
				setState(612);
				noChit();
				}
				break;
			case U_BAG:
				enterOuterAlt(_localctx, 3);
				{
				setState(613);
				chitFromBag();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class EvenChitRowContext extends ParserRuleContext {
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public List<ChitContext> chit() {
			return getRuleContexts(ChitContext.class);
		}
		public ChitContext chit(int i) {
			return getRuleContext(ChitContext.class,i);
		}
		public EvenChitRowContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_evenChitRow; }
	}

	public final EvenChitRowContext evenChitRow() throws RecognitionException {
		EvenChitRowContext _localctx = new EvenChitRowContext(_ctx, getState());
		enterRule(_localctx, 94, RULE_evenChitRow);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(616);
			match(SPACE);
			setState(617);
			match(SPACE);
			setState(628); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(618);
				chit();
				setState(620);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,35,_ctx) ) {
				case 1:
					{
					setState(619);
					match(SPACE);
					}
					break;
				}
				setState(623);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,36,_ctx) ) {
				case 1:
					{
					setState(622);
					match(SPACE);
					}
					break;
				}
				setState(626);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==SPACE) {
					{
					setState(625);
					match(SPACE);
					}
				}

				}
				}
				setState(630); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==T__25 || _la==NUMBER || _la==U_BAG );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class OddChitRowContext extends ParserRuleContext {
		public List<ChitContext> chit() {
			return getRuleContexts(ChitContext.class);
		}
		public ChitContext chit(int i) {
			return getRuleContext(ChitContext.class,i);
		}
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public OddChitRowContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_oddChitRow; }
	}

	public final OddChitRowContext oddChitRow() throws RecognitionException {
		OddChitRowContext _localctx = new OddChitRowContext(_ctx, getState());
		enterRule(_localctx, 96, RULE_oddChitRow);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(632);
			chit();
			setState(643); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(634);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,39,_ctx) ) {
				case 1:
					{
					setState(633);
					match(SPACE);
					}
					break;
				}
				setState(637);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,40,_ctx) ) {
				case 1:
					{
					setState(636);
					match(SPACE);
					}
					break;
				}
				setState(640);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==SPACE) {
					{
					setState(639);
					match(SPACE);
					}
				}

				setState(642);
				chit();
				}
				}
				setState(645); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==T__25 || ((((_la - 153)) & ~0x3f) == 0 && ((1L << (_la - 153)) & ((1L << (NUMBER - 153)) | (1L << (SPACE - 153)) | (1L << (U_BAG - 153)))) != 0) );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PortsSetupContext extends ParserRuleContext {
		public List<TerminalNode> NL() { return getTokens(jsettlersParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(jsettlersParser.NL, i);
		}
		public List<TerminalNode> INDENT() { return getTokens(jsettlersParser.INDENT); }
		public TerminalNode INDENT(int i) {
			return getToken(jsettlersParser.INDENT, i);
		}
		public List<PortAtEdgeContext> portAtEdge() {
			return getRuleContexts(PortAtEdgeContext.class);
		}
		public PortAtEdgeContext portAtEdge(int i) {
			return getRuleContext(PortAtEdgeContext.class,i);
		}
		public PortsSetupContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_portsSetup; }
	}

	public final PortsSetupContext portsSetup() throws RecognitionException {
		PortsSetupContext _localctx = new PortsSetupContext(_ctx, getState());
		enterRule(_localctx, 98, RULE_portsSetup);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(647);
			match(T__27);
			setState(648);
			match(NL);
			setState(657);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==INDENT) {
				{
				{
				setState(649);
				match(INDENT);
				setState(650);
				match(INDENT);
				setState(651);
				match(INDENT);
				setState(652);
				portAtEdge();
				setState(653);
				match(NL);
				}
				}
				setState(659);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PortAtEdgeContext extends ParserRuleContext {
		public PortContext port() {
			return getRuleContext(PortContext.class,0);
		}
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public AtContext at() {
			return getRuleContext(AtContext.class,0);
		}
		public EdgeContext edge() {
			return getRuleContext(EdgeContext.class,0);
		}
		public PortAtEdgeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_portAtEdge; }
	}

	public final PortAtEdgeContext portAtEdge() throws RecognitionException {
		PortAtEdgeContext _localctx = new PortAtEdgeContext(_ctx, getState());
		enterRule(_localctx, 100, RULE_portAtEdge);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(660);
			port();
			setState(661);
			match(SPACE);
			setState(662);
			at();
			setState(663);
			match(SPACE);
			setState(664);
			edge();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PlayersContext extends ParserRuleContext {
		public List<TerminalNode> INDENT() { return getTokens(jsettlersParser.INDENT); }
		public TerminalNode INDENT(int i) {
			return getToken(jsettlersParser.INDENT, i);
		}
		public PlayerContext player() {
			return getRuleContext(PlayerContext.class,0);
		}
		public List<TerminalNode> NL() { return getTokens(jsettlersParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(jsettlersParser.NL, i);
		}
		public List<SetupPlayerOptionContext> setupPlayerOption() {
			return getRuleContexts(SetupPlayerOptionContext.class);
		}
		public SetupPlayerOptionContext setupPlayerOption(int i) {
			return getRuleContext(SetupPlayerOptionContext.class,i);
		}
		public PlayersContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_players; }
	}

	public final PlayersContext players() throws RecognitionException {
		PlayersContext _localctx = new PlayersContext(_ctx, getState());
		enterRule(_localctx, 102, RULE_players);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(666);
			match(INDENT);
			setState(667);
			player();
			setState(668);
			match(NL);
			setState(676);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==INDENT) {
				{
				{
				setState(669);
				match(INDENT);
				setState(670);
				match(INDENT);
				setState(671);
				setupPlayerOption();
				setState(672);
				match(NL);
				}
				}
				setState(678);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PlayerContext extends ParserRuleContext {
		public TerminalNode NUMBER() { return getToken(jsettlersParser.NUMBER, 0); }
		public ServerContext server() {
			return getRuleContext(ServerContext.class,0);
		}
		public ClientContext client() {
			return getRuleContext(ClientContext.class,0);
		}
		public PlayerContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_player; }
	}

	public final PlayerContext player() throws RecognitionException {
		PlayerContext _localctx = new PlayerContext(_ctx, getState());
		enterRule(_localctx, 104, RULE_player);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(681);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__30:
			case T__31:
				{
				setState(679);
				server();
				}
				break;
			case T__33:
			case T__34:
				{
				setState(680);
				client();
				}
				break;
			case T__28:
			case T__29:
				break;
			default:
				break;
			}
			setState(683);
			_la = _input.LA(1);
			if ( !(_la==T__28 || _la==T__29) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			setState(684);
			match(NUMBER);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ServerContext extends ParserRuleContext {
		public ServerContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_server; }
	}

	public final ServerContext server() throws RecognitionException {
		ServerContext _localctx = new ServerContext(_ctx, getState());
		enterRule(_localctx, 106, RULE_server);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(686);
			_la = _input.LA(1);
			if ( !(_la==T__30 || _la==T__31) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			setState(687);
			match(T__32);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ClientContext extends ParserRuleContext {
		public ClientContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_client; }
	}

	public final ClientContext client() throws RecognitionException {
		ClientContext _localctx = new ClientContext(_ctx, getState());
		enterRule(_localctx, 108, RULE_client);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(689);
			_la = _input.LA(1);
			if ( !(_la==T__33 || _la==T__34) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			setState(690);
			match(T__32);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class SetupPlayerOptionContext extends ParserRuleContext {
		public HandContext hand() {
			return getRuleContext(HandContext.class,0);
		}
		public StockContext stock() {
			return getRuleContext(StockContext.class,0);
		}
		public DevCardsContext devCards() {
			return getRuleContext(DevCardsContext.class,0);
		}
		public PortsContext ports() {
			return getRuleContext(PortsContext.class,0);
		}
		public VictoryPointsContext victoryPoints() {
			return getRuleContext(VictoryPointsContext.class,0);
		}
		public TownsContext towns() {
			return getRuleContext(TownsContext.class,0);
		}
		public CitiesContext cities() {
			return getRuleContext(CitiesContext.class,0);
		}
		public RoadsContext roads() {
			return getRuleContext(RoadsContext.class,0);
		}
		public SetupPlayerOptionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_setupPlayerOption; }
	}

	public final SetupPlayerOptionContext setupPlayerOption() throws RecognitionException {
		SetupPlayerOptionContext _localctx = new SetupPlayerOptionContext(_ctx, getState());
		enterRule(_localctx, 110, RULE_setupPlayerOption);
		try {
			setState(700);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__35:
				enterOuterAlt(_localctx, 1);
				{
				setState(692);
				hand();
				}
				break;
			case T__36:
				enterOuterAlt(_localctx, 2);
				{
				setState(693);
				stock();
				}
				break;
			case T__37:
				enterOuterAlt(_localctx, 3);
				{
				setState(694);
				devCards();
				}
				break;
			case T__27:
				enterOuterAlt(_localctx, 4);
				{
				setState(695);
				ports();
				}
				break;
			case T__38:
				enterOuterAlt(_localctx, 5);
				{
				setState(696);
				victoryPoints();
				}
				break;
			case T__39:
				enterOuterAlt(_localctx, 6);
				{
				setState(697);
				towns();
				}
				break;
			case T__40:
				enterOuterAlt(_localctx, 7);
				{
				setState(698);
				cities();
				}
				break;
			case T__41:
				enterOuterAlt(_localctx, 8);
				{
				setState(699);
				roads();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class HandContext extends ParserRuleContext {
		public TerminalNode SPACE() { return getToken(jsettlersParser.SPACE, 0); }
		public ResourceSetContext resourceSet() {
			return getRuleContext(ResourceSetContext.class,0);
		}
		public HandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_hand; }
	}

	public final HandContext hand() throws RecognitionException {
		HandContext _localctx = new HandContext(_ctx, getState());
		enterRule(_localctx, 112, RULE_hand);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(702);
			match(T__35);
			setState(703);
			match(SPACE);
			setState(704);
			resourceSet();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class StockContext extends ParserRuleContext {
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public List<StockItemContext> stockItem() {
			return getRuleContexts(StockItemContext.class);
		}
		public StockItemContext stockItem(int i) {
			return getRuleContext(StockItemContext.class,i);
		}
		public StockContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_stock; }
	}

	public final StockContext stock() throws RecognitionException {
		StockContext _localctx = new StockContext(_ctx, getState());
		enterRule(_localctx, 114, RULE_stock);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(706);
			match(T__36);
			setState(707);
			match(SPACE);
			setState(708);
			match(T__12);
			setState(715);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (((((_la - 105)) & ~0x3f) == 0 && ((1L << (_la - 105)) & ((1L << (T__104 - 105)) | (1L << (T__105 - 105)) | (1L << (T__106 - 105)) | (1L << (T__107 - 105)) | (1L << (T__108 - 105)) | (1L << (T__109 - 105)) | (1L << (T__110 - 105)) | (1L << (T__111 - 105)))) != 0)) {
				{
				{
				setState(709);
				stockItem();
				setState(711);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==SPACE) {
					{
					setState(710);
					match(SPACE);
					}
				}

				}
				}
				setState(717);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(718);
			match(T__13);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class StockItemContext extends ParserRuleContext {
		public PieceContext piece() {
			return getRuleContext(PieceContext.class,0);
		}
		public TimesContext times() {
			return getRuleContext(TimesContext.class,0);
		}
		public TerminalNode NUMBER() { return getToken(jsettlersParser.NUMBER, 0); }
		public StockItemContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_stockItem; }
	}

	public final StockItemContext stockItem() throws RecognitionException {
		StockItemContext _localctx = new StockItemContext(_ctx, getState());
		enterRule(_localctx, 116, RULE_stockItem);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(720);
			piece();
			setState(721);
			times();
			setState(722);
			match(NUMBER);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class DevCardsContext extends ParserRuleContext {
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public List<DevCardContext> devCard() {
			return getRuleContexts(DevCardContext.class);
		}
		public DevCardContext devCard(int i) {
			return getRuleContext(DevCardContext.class,i);
		}
		public DevCardsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_devCards; }
	}

	public final DevCardsContext devCards() throws RecognitionException {
		DevCardsContext _localctx = new DevCardsContext(_ctx, getState());
		enterRule(_localctx, 118, RULE_devCards);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(724);
			match(T__37);
			setState(725);
			match(SPACE);
			setState(726);
			match(T__12);
			setState(733);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__31 || ((((_la - 113)) & ~0x3f) == 0 && ((1L << (_la - 113)) & ((1L << (T__112 - 113)) | (1L << (T__113 - 113)) | (1L << (T__114 - 113)) | (1L << (T__115 - 113)) | (1L << (T__116 - 113)) | (1L << (T__117 - 113)) | (1L << (T__118 - 113)) | (1L << (T__119 - 113)) | (1L << (T__120 - 113)))) != 0)) {
				{
				{
				setState(727);
				devCard();
				setState(729);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==SPACE) {
					{
					setState(728);
					match(SPACE);
					}
				}

				}
				}
				setState(735);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(736);
			match(T__13);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PortsContext extends ParserRuleContext {
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public List<PortContext> port() {
			return getRuleContexts(PortContext.class);
		}
		public PortContext port(int i) {
			return getRuleContext(PortContext.class,i);
		}
		public PortsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_ports; }
	}

	public final PortsContext ports() throws RecognitionException {
		PortsContext _localctx = new PortsContext(_ctx, getState());
		enterRule(_localctx, 120, RULE_ports);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(738);
			match(T__27);
			setState(739);
			match(SPACE);
			setState(740);
			match(T__12);
			setState(747);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (((((_la - 122)) & ~0x3f) == 0 && ((1L << (_la - 122)) & ((1L << (T__121 - 122)) | (1L << (T__122 - 122)) | (1L << (T__124 - 122)) | (1L << (T__126 - 122)) | (1L << (T__127 - 122)) | (1L << (T__128 - 122)) | (1L << (T__129 - 122)) | (1L << (T__130 - 122)) | (1L << (T__131 - 122)) | (1L << (U_PORT - 122)))) != 0)) {
				{
				{
				setState(741);
				port();
				setState(743);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==SPACE) {
					{
					setState(742);
					match(SPACE);
					}
				}

				}
				}
				setState(749);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(750);
			match(T__13);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class VictoryPointsContext extends ParserRuleContext {
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public List<VictoryPointtContext> victoryPointt() {
			return getRuleContexts(VictoryPointtContext.class);
		}
		public VictoryPointtContext victoryPointt(int i) {
			return getRuleContext(VictoryPointtContext.class,i);
		}
		public VictoryPointsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_victoryPoints; }
	}

	public final VictoryPointsContext victoryPoints() throws RecognitionException {
		VictoryPointsContext _localctx = new VictoryPointsContext(_ctx, getState());
		enterRule(_localctx, 122, RULE_victoryPoints);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(752);
			match(T__38);
			setState(753);
			match(SPACE);
			setState(754);
			match(T__12);
			setState(761);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (((((_la - 105)) & ~0x3f) == 0 && ((1L << (_la - 105)) & ((1L << (T__104 - 105)) | (1L << (T__105 - 105)) | (1L << (T__106 - 105)) | (1L << (T__107 - 105)) | (1L << (T__117 - 105)) | (1L << (T__118 - 105)) | (1L << (T__146 - 105)) | (1L << (T__147 - 105)) | (1L << (T__148 - 105)) | (1L << (T__149 - 105)))) != 0)) {
				{
				{
				setState(755);
				victoryPointt();
				setState(757);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==SPACE) {
					{
					setState(756);
					match(SPACE);
					}
				}

				}
				}
				setState(763);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(764);
			match(T__13);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class TownsContext extends ParserRuleContext {
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public List<NodeContext> node() {
			return getRuleContexts(NodeContext.class);
		}
		public NodeContext node(int i) {
			return getRuleContext(NodeContext.class,i);
		}
		public TownsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_towns; }
	}

	public final TownsContext towns() throws RecognitionException {
		TownsContext _localctx = new TownsContext(_ctx, getState());
		enterRule(_localctx, 124, RULE_towns);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(766);
			match(T__39);
			setState(767);
			match(SPACE);
			setState(768);
			match(T__12);
			setState(775);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==NUMBER) {
				{
				{
				setState(769);
				node();
				setState(771);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==SPACE) {
					{
					setState(770);
					match(SPACE);
					}
				}

				}
				}
				setState(777);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(778);
			match(T__13);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class CitiesContext extends ParserRuleContext {
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public List<NodeContext> node() {
			return getRuleContexts(NodeContext.class);
		}
		public NodeContext node(int i) {
			return getRuleContext(NodeContext.class,i);
		}
		public CitiesContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_cities; }
	}

	public final CitiesContext cities() throws RecognitionException {
		CitiesContext _localctx = new CitiesContext(_ctx, getState());
		enterRule(_localctx, 126, RULE_cities);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(780);
			match(T__40);
			setState(781);
			match(SPACE);
			setState(782);
			match(T__12);
			setState(789);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==NUMBER) {
				{
				{
				setState(783);
				node();
				setState(785);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==SPACE) {
					{
					setState(784);
					match(SPACE);
					}
				}

				}
				}
				setState(791);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(792);
			match(T__13);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class RoadsContext extends ParserRuleContext {
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public List<EdgeContext> edge() {
			return getRuleContexts(EdgeContext.class);
		}
		public EdgeContext edge(int i) {
			return getRuleContext(EdgeContext.class,i);
		}
		public RoadsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_roads; }
	}

	public final RoadsContext roads() throws RecognitionException {
		RoadsContext _localctx = new RoadsContext(_ctx, getState());
		enterRule(_localctx, 128, RULE_roads);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(794);
			match(T__41);
			setState(795);
			match(SPACE);
			setState(796);
			match(T__12);
			setState(803);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==NUMBER) {
				{
				{
				setState(797);
				edge();
				setState(799);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==SPACE) {
					{
					setState(798);
					match(SPACE);
					}
				}

				}
				}
				setState(805);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(806);
			match(T__13);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PlacementItemContext extends ParserRuleContext {
		public BuildActionContext buildAction() {
			return getRuleContext(BuildActionContext.class,0);
		}
		public CheckItemContext checkItem() {
			return getRuleContext(CheckItemContext.class,0);
		}
		public PlacementItemContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_placementItem; }
	}

	public final PlacementItemContext placementItem() throws RecognitionException {
		PlacementItemContext _localctx = new PlacementItemContext(_ctx, getState());
		enterRule(_localctx, 130, RULE_placementItem);
		try {
			setState(810);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__28:
			case T__29:
			case T__30:
			case T__31:
			case T__33:
			case T__34:
				enterOuterAlt(_localctx, 1);
				{
				setState(808);
				buildAction();
				}
				break;
			case INDENT:
				enterOuterAlt(_localctx, 2);
				{
				setState(809);
				checkItem();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PlacementsContext extends ParserRuleContext {
		public List<TerminalNode> NL() { return getTokens(jsettlersParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(jsettlersParser.NL, i);
		}
		public List<TerminalNode> INDENT() { return getTokens(jsettlersParser.INDENT); }
		public TerminalNode INDENT(int i) {
			return getToken(jsettlersParser.INDENT, i);
		}
		public List<PlacementItemContext> placementItem() {
			return getRuleContexts(PlacementItemContext.class);
		}
		public PlacementItemContext placementItem(int i) {
			return getRuleContext(PlacementItemContext.class,i);
		}
		public PlacementsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_placements; }
	}

	public final PlacementsContext placements() throws RecognitionException {
		PlacementsContext _localctx = new PlacementsContext(_ctx, getState());
		enterRule(_localctx, 132, RULE_placements);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(812);
			match(T__42);
			setState(813);
			match(NL);
			setState(820);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==INDENT) {
				{
				{
				setState(814);
				match(INDENT);
				setState(815);
				placementItem();
				setState(816);
				match(NL);
				}
				}
				setState(822);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class BuildActionContext extends ParserRuleContext {
		public BuildCityContext buildCity() {
			return getRuleContext(BuildCityContext.class,0);
		}
		public BuildShipContext buildShip() {
			return getRuleContext(BuildShipContext.class,0);
		}
		public BuildRoadContext buildRoad() {
			return getRuleContext(BuildRoadContext.class,0);
		}
		public BuildTownContext buildTown() {
			return getRuleContext(BuildTownContext.class,0);
		}
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public ResourceSetContext resourceSet() {
			return getRuleContext(ResourceSetContext.class,0);
		}
		public BuildActionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_buildAction; }
	}

	public final BuildActionContext buildAction() throws RecognitionException {
		BuildActionContext _localctx = new BuildActionContext(_ctx, getState());
		enterRule(_localctx, 134, RULE_buildAction);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(827);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,63,_ctx) ) {
			case 1:
				{
				setState(823);
				buildCity();
				}
				break;
			case 2:
				{
				setState(824);
				buildShip();
				}
				break;
			case 3:
				{
				setState(825);
				buildRoad();
				}
				break;
			case 4:
				{
				setState(826);
				buildTown();
				}
				break;
			}
			setState(833);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==SPACE) {
				{
				setState(829);
				match(SPACE);
				setState(830);
				match(T__43);
				setState(831);
				match(SPACE);
				setState(832);
				resourceSet();
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class TurnsContext extends ParserRuleContext {
		public List<TerminalNode> NL() { return getTokens(jsettlersParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(jsettlersParser.NL, i);
		}
		public List<TerminalNode> INDENT() { return getTokens(jsettlersParser.INDENT); }
		public TerminalNode INDENT(int i) {
			return getToken(jsettlersParser.INDENT, i);
		}
		public List<TurnContext> turn() {
			return getRuleContexts(TurnContext.class);
		}
		public TurnContext turn(int i) {
			return getRuleContext(TurnContext.class,i);
		}
		public TurnsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_turns; }
	}

	public final TurnsContext turns() throws RecognitionException {
		TurnsContext _localctx = new TurnsContext(_ctx, getState());
		enterRule(_localctx, 136, RULE_turns);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(835);
			match(T__44);
			setState(836);
			match(NL);
			setState(841); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(837);
				match(INDENT);
				setState(838);
				turn();
				setState(839);
				match(NL);
				}
				}
				setState(843); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==INDENT );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class TurnContext extends ParserRuleContext {
		public TerminalNode SPACE() { return getToken(jsettlersParser.SPACE, 0); }
		public TerminalNode NUMBER() { return getToken(jsettlersParser.NUMBER, 0); }
		public List<TerminalNode> NL() { return getTokens(jsettlersParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(jsettlersParser.NL, i);
		}
		public List<TerminalNode> INDENT() { return getTokens(jsettlersParser.INDENT); }
		public TerminalNode INDENT(int i) {
			return getToken(jsettlersParser.INDENT, i);
		}
		public List<TurnItemContext> turnItem() {
			return getRuleContexts(TurnItemContext.class);
		}
		public TurnItemContext turnItem(int i) {
			return getRuleContext(TurnItemContext.class,i);
		}
		public TurnContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_turn; }
	}

	public final TurnContext turn() throws RecognitionException {
		TurnContext _localctx = new TurnContext(_ctx, getState());
		enterRule(_localctx, 138, RULE_turn);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(845);
			match(T__45);
			setState(846);
			match(SPACE);
			setState(847);
			match(NUMBER);
			setState(848);
			match(NL);
			setState(856);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==INDENT) {
				{
				{
				setState(849);
				match(INDENT);
				setState(850);
				match(INDENT);
				setState(851);
				turnItem();
				setState(852);
				match(NL);
				}
				}
				setState(858);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class TurnItemContext extends ParserRuleContext {
		public ActionContext action() {
			return getRuleContext(ActionContext.class,0);
		}
		public CheckItemContext checkItem() {
			return getRuleContext(CheckItemContext.class,0);
		}
		public TurnItemContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_turnItem; }
	}

	public final TurnItemContext turnItem() throws RecognitionException {
		TurnItemContext _localctx = new TurnItemContext(_ctx, getState());
		enterRule(_localctx, 140, RULE_turnItem);
		try {
			setState(861);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__28:
			case T__29:
			case T__30:
			case T__31:
			case T__33:
			case T__34:
				enterOuterAlt(_localctx, 1);
				{
				setState(859);
				action();
				}
				break;
			case INDENT:
				enterOuterAlt(_localctx, 2);
				{
				setState(860);
				checkItem();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ActionContext extends ParserRuleContext {
		public BuildRoadContext buildRoad() {
			return getRuleContext(BuildRoadContext.class,0);
		}
		public BuildTownContext buildTown() {
			return getRuleContext(BuildTownContext.class,0);
		}
		public BuildShipContext buildShip() {
			return getRuleContext(BuildShipContext.class,0);
		}
		public BuildCityContext buildCity() {
			return getRuleContext(BuildCityContext.class,0);
		}
		public EndTurnContext endTurn() {
			return getRuleContext(EndTurnContext.class,0);
		}
		public MoveRobberContext moveRobber() {
			return getRuleContext(MoveRobberContext.class,0);
		}
		public RollDiceContext rollDice() {
			return getRuleContext(RollDiceContext.class,0);
		}
		public MoveShipContext moveShip() {
			return getRuleContext(MoveShipContext.class,0);
		}
		public OfferTradeContext offerTrade() {
			return getRuleContext(OfferTradeContext.class,0);
		}
		public AcceptOfferContext acceptOffer() {
			return getRuleContext(AcceptOfferContext.class,0);
		}
		public RejectOfferContext rejectOffer() {
			return getRuleContext(RejectOfferContext.class,0);
		}
		public CounterOfferContext counterOffer() {
			return getRuleContext(CounterOfferContext.class,0);
		}
		public TradePlayerContext tradePlayer() {
			return getRuleContext(TradePlayerContext.class,0);
		}
		public LooseResourcesContext looseResources() {
			return getRuleContext(LooseResourcesContext.class,0);
		}
		public RobPlayerContext robPlayer() {
			return getRuleContext(RobPlayerContext.class,0);
		}
		public BuyDevelopmentCardContext buyDevelopmentCard() {
			return getRuleContext(BuyDevelopmentCardContext.class,0);
		}
		public PlayDevelopmentCardContext playDevelopmentCard() {
			return getRuleContext(PlayDevelopmentCardContext.class,0);
		}
		public ActionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_action; }
	}

	public final ActionContext action() throws RecognitionException {
		ActionContext _localctx = new ActionContext(_ctx, getState());
		enterRule(_localctx, 142, RULE_action);
		try {
			setState(880);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,68,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(863);
				buildRoad();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(864);
				buildTown();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(865);
				buildShip();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(866);
				buildCity();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(867);
				endTurn();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(868);
				moveRobber();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(869);
				rollDice();
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(870);
				moveShip();
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(871);
				offerTrade();
				}
				break;
			case 10:
				enterOuterAlt(_localctx, 10);
				{
				setState(872);
				acceptOffer();
				}
				break;
			case 11:
				enterOuterAlt(_localctx, 11);
				{
				setState(873);
				rejectOffer();
				}
				break;
			case 12:
				enterOuterAlt(_localctx, 12);
				{
				setState(874);
				counterOffer();
				}
				break;
			case 13:
				enterOuterAlt(_localctx, 13);
				{
				setState(875);
				tradePlayer();
				}
				break;
			case 14:
				enterOuterAlt(_localctx, 14);
				{
				setState(876);
				looseResources();
				}
				break;
			case 15:
				enterOuterAlt(_localctx, 15);
				{
				setState(877);
				robPlayer();
				}
				break;
			case 16:
				enterOuterAlt(_localctx, 16);
				{
				setState(878);
				buyDevelopmentCard();
				}
				break;
			case 17:
				enterOuterAlt(_localctx, 17);
				{
				setState(879);
				playDevelopmentCard();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class BuildContext extends ParserRuleContext {
		public TerminalNode U_BUILD() { return getToken(jsettlersParser.U_BUILD, 0); }
		public BuildContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_build; }
	}

	public final BuildContext build() throws RecognitionException {
		BuildContext _localctx = new BuildContext(_ctx, getState());
		enterRule(_localctx, 144, RULE_build);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(882);
			_la = _input.LA(1);
			if ( !(_la==T__46 || _la==T__47 || _la==U_BUILD) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class EndTurnContext extends ParserRuleContext {
		public PlayerContext player() {
			return getRuleContext(PlayerContext.class,0);
		}
		public TerminalNode SPACE() { return getToken(jsettlersParser.SPACE, 0); }
		public EndTurnContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_endTurn; }
	}

	public final EndTurnContext endTurn() throws RecognitionException {
		EndTurnContext _localctx = new EndTurnContext(_ctx, getState());
		enterRule(_localctx, 146, RULE_endTurn);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(884);
			player();
			setState(885);
			match(SPACE);
			setState(886);
			match(T__48);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class BuildCityContext extends ParserRuleContext {
		public PlayerContext player() {
			return getRuleContext(PlayerContext.class,0);
		}
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public BuildContext build() {
			return getRuleContext(BuildContext.class,0);
		}
		public CityContext city() {
			return getRuleContext(CityContext.class,0);
		}
		public NodeContext node() {
			return getRuleContext(NodeContext.class,0);
		}
		public AtContext at() {
			return getRuleContext(AtContext.class,0);
		}
		public BuildCityContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_buildCity; }
	}

	public final BuildCityContext buildCity() throws RecognitionException {
		BuildCityContext _localctx = new BuildCityContext(_ctx, getState());
		enterRule(_localctx, 148, RULE_buildCity);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(888);
			player();
			setState(889);
			match(SPACE);
			setState(890);
			build();
			setState(892);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==SPACE) {
				{
				setState(891);
				match(SPACE);
				}
			}

			setState(894);
			city();
			setState(895);
			match(SPACE);
			setState(899);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__0 || _la==T__1) {
				{
				setState(896);
				at();
				setState(897);
				match(SPACE);
				}
			}

			setState(901);
			node();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class BuildShipContext extends ParserRuleContext {
		public PlayerContext player() {
			return getRuleContext(PlayerContext.class,0);
		}
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public BuildContext build() {
			return getRuleContext(BuildContext.class,0);
		}
		public ShipContext ship() {
			return getRuleContext(ShipContext.class,0);
		}
		public EdgeContext edge() {
			return getRuleContext(EdgeContext.class,0);
		}
		public AtContext at() {
			return getRuleContext(AtContext.class,0);
		}
		public BuildShipContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_buildShip; }
	}

	public final BuildShipContext buildShip() throws RecognitionException {
		BuildShipContext _localctx = new BuildShipContext(_ctx, getState());
		enterRule(_localctx, 150, RULE_buildShip);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(903);
			player();
			setState(904);
			match(SPACE);
			setState(905);
			build();
			setState(907);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==SPACE) {
				{
				setState(906);
				match(SPACE);
				}
			}

			setState(909);
			ship();
			setState(910);
			match(SPACE);
			setState(914);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__0 || _la==T__1) {
				{
				setState(911);
				at();
				setState(912);
				match(SPACE);
				}
			}

			setState(916);
			edge();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class BuildRoadContext extends ParserRuleContext {
		public PlayerContext player() {
			return getRuleContext(PlayerContext.class,0);
		}
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public BuildContext build() {
			return getRuleContext(BuildContext.class,0);
		}
		public RoadContext road() {
			return getRuleContext(RoadContext.class,0);
		}
		public EdgeContext edge() {
			return getRuleContext(EdgeContext.class,0);
		}
		public AtContext at() {
			return getRuleContext(AtContext.class,0);
		}
		public BuildRoadContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_buildRoad; }
	}

	public final BuildRoadContext buildRoad() throws RecognitionException {
		BuildRoadContext _localctx = new BuildRoadContext(_ctx, getState());
		enterRule(_localctx, 152, RULE_buildRoad);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(918);
			player();
			setState(919);
			match(SPACE);
			setState(920);
			build();
			setState(922);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==SPACE) {
				{
				setState(921);
				match(SPACE);
				}
			}

			setState(924);
			road();
			setState(925);
			match(SPACE);
			setState(929);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__0 || _la==T__1) {
				{
				setState(926);
				at();
				setState(927);
				match(SPACE);
				}
			}

			setState(931);
			edge();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class BuildTownContext extends ParserRuleContext {
		public PlayerContext player() {
			return getRuleContext(PlayerContext.class,0);
		}
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public BuildContext build() {
			return getRuleContext(BuildContext.class,0);
		}
		public TownContext town() {
			return getRuleContext(TownContext.class,0);
		}
		public NodeContext node() {
			return getRuleContext(NodeContext.class,0);
		}
		public AtContext at() {
			return getRuleContext(AtContext.class,0);
		}
		public BuildTownContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_buildTown; }
	}

	public final BuildTownContext buildTown() throws RecognitionException {
		BuildTownContext _localctx = new BuildTownContext(_ctx, getState());
		enterRule(_localctx, 154, RULE_buildTown);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(933);
			player();
			setState(934);
			match(SPACE);
			setState(935);
			build();
			setState(937);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==SPACE) {
				{
				setState(936);
				match(SPACE);
				}
			}

			setState(939);
			town();
			setState(940);
			match(SPACE);
			setState(944);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__0 || _la==T__1) {
				{
				setState(941);
				at();
				setState(942);
				match(SPACE);
				}
			}

			setState(946);
			node();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class MoveRobberContext extends ParserRuleContext {
		public PlayerContext player() {
			return getRuleContext(PlayerContext.class,0);
		}
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public RobberContext robber() {
			return getRuleContext(RobberContext.class,0);
		}
		public CoordContext coord() {
			return getRuleContext(CoordContext.class,0);
		}
		public MoveRobberContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_moveRobber; }
	}

	public final MoveRobberContext moveRobber() throws RecognitionException {
		MoveRobberContext _localctx = new MoveRobberContext(_ctx, getState());
		enterRule(_localctx, 156, RULE_moveRobber);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(948);
			player();
			setState(949);
			match(SPACE);
			setState(950);
			match(T__49);
			setState(951);
			match(SPACE);
			setState(952);
			robber();
			setState(953);
			match(SPACE);
			setState(954);
			match(T__50);
			setState(955);
			match(SPACE);
			setState(956);
			coord();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class RollDiceContext extends ParserRuleContext {
		public PlayerContext player() {
			return getRuleContext(PlayerContext.class,0);
		}
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public RollContext roll() {
			return getRuleContext(RollContext.class,0);
		}
		public ProductionContext production() {
			return getRuleContext(ProductionContext.class,0);
		}
		public RollDiceContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_rollDice; }
	}

	public final RollDiceContext rollDice() throws RecognitionException {
		RollDiceContext _localctx = new RollDiceContext(_ctx, getState());
		enterRule(_localctx, 158, RULE_rollDice);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(958);
			player();
			setState(959);
			match(SPACE);
			setState(960);
			roll();
			setState(961);
			match(SPACE);
			setState(962);
			production();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class DiceContext extends ParserRuleContext {
		public TerminalNode U_DICE() { return getToken(jsettlersParser.U_DICE, 0); }
		public TerminalNode SPACE() { return getToken(jsettlersParser.SPACE, 0); }
		public DiceContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_dice; }
	}

	public final DiceContext dice() throws RecognitionException {
		DiceContext _localctx = new DiceContext(_ctx, getState());
		enterRule(_localctx, 160, RULE_dice);
		try {
			setState(967);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case U_DICE:
				enterOuterAlt(_localctx, 1);
				{
				setState(964);
				match(U_DICE);
				}
				break;
			case T__51:
				enterOuterAlt(_localctx, 2);
				{
				{
				setState(965);
				match(T__51);
				setState(966);
				match(SPACE);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class RollContext extends ParserRuleContext {
		public DiceContext dice() {
			return getRuleContext(DiceContext.class,0);
		}
		public TerminalNode NUMBER() { return getToken(jsettlersParser.NUMBER, 0); }
		public RollContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_roll; }
	}

	public final RollContext roll() throws RecognitionException {
		RollContext _localctx = new RollContext(_ctx, getState());
		enterRule(_localctx, 162, RULE_roll);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(969);
			dice();
			setState(970);
			match(NUMBER);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PlayerProductionContext extends ParserRuleContext {
		public PlayerContext player() {
			return getRuleContext(PlayerContext.class,0);
		}
		public TerminalNode SPACE() { return getToken(jsettlersParser.SPACE, 0); }
		public ResourceSetContext resourceSet() {
			return getRuleContext(ResourceSetContext.class,0);
		}
		public PlayerProductionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_playerProduction; }
	}

	public final PlayerProductionContext playerProduction() throws RecognitionException {
		PlayerProductionContext _localctx = new PlayerProductionContext(_ctx, getState());
		enterRule(_localctx, 164, RULE_playerProduction);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(972);
			player();
			setState(973);
			match(SPACE);
			setState(974);
			resourceSet();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ProductionContext extends ParserRuleContext {
		public List<PlayerProductionContext> playerProduction() {
			return getRuleContexts(PlayerProductionContext.class);
		}
		public PlayerProductionContext playerProduction(int i) {
			return getRuleContext(PlayerProductionContext.class,i);
		}
		public ProductionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_production; }
	}

	public final ProductionContext production() throws RecognitionException {
		ProductionContext _localctx = new ProductionContext(_ctx, getState());
		enterRule(_localctx, 166, RULE_production);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(976);
			match(T__12);
			setState(985);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__28) | (1L << T__29) | (1L << T__30) | (1L << T__31) | (1L << T__33) | (1L << T__34))) != 0)) {
				{
				setState(977);
				playerProduction();
				setState(982);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==T__17) {
					{
					{
					setState(978);
					match(T__17);
					setState(979);
					playerProduction();
					}
					}
					setState(984);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
			}

			setState(987);
			match(T__13);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class MoveShipContext extends ParserRuleContext {
		public PlayerContext player() {
			return getRuleContext(PlayerContext.class,0);
		}
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public List<EdgeContext> edge() {
			return getRuleContexts(EdgeContext.class);
		}
		public EdgeContext edge(int i) {
			return getRuleContext(EdgeContext.class,i);
		}
		public MoveShipContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_moveShip; }
	}

	public final MoveShipContext moveShip() throws RecognitionException {
		MoveShipContext _localctx = new MoveShipContext(_ctx, getState());
		enterRule(_localctx, 168, RULE_moveShip);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(989);
			player();
			setState(990);
			match(SPACE);
			setState(991);
			match(T__52);
			setState(992);
			match(SPACE);
			setState(993);
			edge();
			setState(994);
			match(SPACE);
			setState(995);
			match(T__50);
			setState(996);
			match(SPACE);
			setState(997);
			edge();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class OfferTradeContext extends ParserRuleContext {
		public PlayerContext player() {
			return getRuleContext(PlayerContext.class,0);
		}
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public List<ResourceSetContext> resourceSet() {
			return getRuleContexts(ResourceSetContext.class);
		}
		public ResourceSetContext resourceSet(int i) {
			return getRuleContext(ResourceSetContext.class,i);
		}
		public OfferTradeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_offerTrade; }
	}

	public final OfferTradeContext offerTrade() throws RecognitionException {
		OfferTradeContext _localctx = new OfferTradeContext(_ctx, getState());
		enterRule(_localctx, 170, RULE_offerTrade);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(999);
			player();
			setState(1000);
			match(SPACE);
			setState(1001);
			match(T__53);
			setState(1002);
			match(SPACE);
			setState(1003);
			resourceSet();
			setState(1004);
			match(SPACE);
			setState(1005);
			match(T__54);
			setState(1006);
			match(SPACE);
			setState(1007);
			resourceSet();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AcceptOfferContext extends ParserRuleContext {
		public List<PlayerContext> player() {
			return getRuleContexts(PlayerContext.class);
		}
		public PlayerContext player(int i) {
			return getRuleContext(PlayerContext.class,i);
		}
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public AcceptOfferContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_acceptOffer; }
	}

	public final AcceptOfferContext acceptOffer() throws RecognitionException {
		AcceptOfferContext _localctx = new AcceptOfferContext(_ctx, getState());
		enterRule(_localctx, 172, RULE_acceptOffer);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1009);
			player();
			setState(1010);
			match(SPACE);
			setState(1011);
			match(T__55);
			setState(1012);
			match(SPACE);
			setState(1013);
			player();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class RejectOfferContext extends ParserRuleContext {
		public List<PlayerContext> player() {
			return getRuleContexts(PlayerContext.class);
		}
		public PlayerContext player(int i) {
			return getRuleContext(PlayerContext.class,i);
		}
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public RejectOfferContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_rejectOffer; }
	}

	public final RejectOfferContext rejectOffer() throws RecognitionException {
		RejectOfferContext _localctx = new RejectOfferContext(_ctx, getState());
		enterRule(_localctx, 174, RULE_rejectOffer);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1015);
			player();
			setState(1016);
			match(SPACE);
			setState(1017);
			match(T__56);
			setState(1018);
			match(SPACE);
			setState(1019);
			player();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class CounterOfferContext extends ParserRuleContext {
		public PlayerContext player() {
			return getRuleContext(PlayerContext.class,0);
		}
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public List<ResourceSetContext> resourceSet() {
			return getRuleContexts(ResourceSetContext.class);
		}
		public ResourceSetContext resourceSet(int i) {
			return getRuleContext(ResourceSetContext.class,i);
		}
		public CounterOfferContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_counterOffer; }
	}

	public final CounterOfferContext counterOffer() throws RecognitionException {
		CounterOfferContext _localctx = new CounterOfferContext(_ctx, getState());
		enterRule(_localctx, 176, RULE_counterOffer);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1021);
			player();
			setState(1022);
			match(SPACE);
			setState(1023);
			match(T__57);
			setState(1024);
			match(SPACE);
			setState(1025);
			resourceSet();
			setState(1026);
			match(SPACE);
			setState(1027);
			match(T__54);
			setState(1028);
			match(SPACE);
			setState(1029);
			resourceSet();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class TradePlayerContext extends ParserRuleContext {
		public List<PlayerContext> player() {
			return getRuleContexts(PlayerContext.class);
		}
		public PlayerContext player(int i) {
			return getRuleContext(PlayerContext.class,i);
		}
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public List<ResourceSetContext> resourceSet() {
			return getRuleContexts(ResourceSetContext.class);
		}
		public ResourceSetContext resourceSet(int i) {
			return getRuleContext(ResourceSetContext.class,i);
		}
		public TradePlayerContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tradePlayer; }
	}

	public final TradePlayerContext tradePlayer() throws RecognitionException {
		TradePlayerContext _localctx = new TradePlayerContext(_ctx, getState());
		enterRule(_localctx, 178, RULE_tradePlayer);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1031);
			player();
			setState(1032);
			match(SPACE);
			setState(1033);
			match(T__58);
			setState(1034);
			match(SPACE);
			setState(1035);
			resourceSet();
			setState(1036);
			match(SPACE);
			setState(1037);
			match(T__54);
			setState(1038);
			match(SPACE);
			setState(1039);
			resourceSet();
			setState(1040);
			match(SPACE);
			setState(1041);
			match(T__59);
			setState(1042);
			match(SPACE);
			setState(1043);
			player();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class LooseResourcesContext extends ParserRuleContext {
		public PlayerContext player() {
			return getRuleContext(PlayerContext.class,0);
		}
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public ResourceSetContext resourceSet() {
			return getRuleContext(ResourceSetContext.class,0);
		}
		public LooseResourcesContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_looseResources; }
	}

	public final LooseResourcesContext looseResources() throws RecognitionException {
		LooseResourcesContext _localctx = new LooseResourcesContext(_ctx, getState());
		enterRule(_localctx, 180, RULE_looseResources);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1045);
			player();
			setState(1046);
			match(SPACE);
			setState(1047);
			match(T__60);
			setState(1048);
			match(SPACE);
			setState(1049);
			resourceSet();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class RobPlayerContext extends ParserRuleContext {
		public List<PlayerContext> player() {
			return getRuleContexts(PlayerContext.class);
		}
		public PlayerContext player(int i) {
			return getRuleContext(PlayerContext.class,i);
		}
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public ResourceContext resource() {
			return getRuleContext(ResourceContext.class,0);
		}
		public RobPlayerContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_robPlayer; }
	}

	public final RobPlayerContext robPlayer() throws RecognitionException {
		RobPlayerContext _localctx = new RobPlayerContext(_ctx, getState());
		enterRule(_localctx, 182, RULE_robPlayer);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1051);
			player();
			setState(1052);
			match(SPACE);
			setState(1053);
			match(T__61);
			setState(1054);
			match(SPACE);
			setState(1055);
			player();
			setState(1056);
			match(SPACE);
			setState(1057);
			match(T__62);
			setState(1058);
			match(SPACE);
			setState(1059);
			resource();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class BuyDevelopmentCardContext extends ParserRuleContext {
		public PlayerContext player() {
			return getRuleContext(PlayerContext.class,0);
		}
		public TerminalNode SPACE() { return getToken(jsettlersParser.SPACE, 0); }
		public BuyDevelopmentCardContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_buyDevelopmentCard; }
	}

	public final BuyDevelopmentCardContext buyDevelopmentCard() throws RecognitionException {
		BuyDevelopmentCardContext _localctx = new BuyDevelopmentCardContext(_ctx, getState());
		enterRule(_localctx, 184, RULE_buyDevelopmentCard);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1061);
			player();
			setState(1062);
			match(SPACE);
			setState(1063);
			match(T__63);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PlayDevelopmentCardContext extends ParserRuleContext {
		public PlayerContext player() {
			return getRuleContext(PlayerContext.class,0);
		}
		public TerminalNode SPACE() { return getToken(jsettlersParser.SPACE, 0); }
		public PlayDevelopmentCardExpressionContext playDevelopmentCardExpression() {
			return getRuleContext(PlayDevelopmentCardExpressionContext.class,0);
		}
		public PlayDevelopmentCardContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_playDevelopmentCard; }
	}

	public final PlayDevelopmentCardContext playDevelopmentCard() throws RecognitionException {
		PlayDevelopmentCardContext _localctx = new PlayDevelopmentCardContext(_ctx, getState());
		enterRule(_localctx, 186, RULE_playDevelopmentCard);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1065);
			player();
			setState(1066);
			match(SPACE);
			setState(1067);
			match(T__64);
			setState(1068);
			playDevelopmentCardExpression();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PlayDevelopmentCardExpressionContext extends ParserRuleContext {
		public PlaySoldierContext playSoldier() {
			return getRuleContext(PlaySoldierContext.class,0);
		}
		public PlayVictoryPointContext playVictoryPoint() {
			return getRuleContext(PlayVictoryPointContext.class,0);
		}
		public PlayRoadBuildingContext playRoadBuilding() {
			return getRuleContext(PlayRoadBuildingContext.class,0);
		}
		public PlayMonopolyContext playMonopoly() {
			return getRuleContext(PlayMonopolyContext.class,0);
		}
		public PlayYearOfPlentyContext playYearOfPlenty() {
			return getRuleContext(PlayYearOfPlentyContext.class,0);
		}
		public PlayDevelopmentCardExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_playDevelopmentCardExpression; }
	}

	public final PlayDevelopmentCardExpressionContext playDevelopmentCardExpression() throws RecognitionException {
		PlayDevelopmentCardExpressionContext _localctx = new PlayDevelopmentCardExpressionContext(_ctx, getState());
		enterRule(_localctx, 188, RULE_playDevelopmentCardExpression);
		try {
			setState(1075);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__31:
			case T__112:
				enterOuterAlt(_localctx, 1);
				{
				setState(1070);
				playSoldier();
				}
				break;
			case T__117:
			case T__118:
				enterOuterAlt(_localctx, 2);
				{
				setState(1071);
				playVictoryPoint();
				}
				break;
			case T__115:
			case T__116:
				enterOuterAlt(_localctx, 3);
				{
				setState(1072);
				playRoadBuilding();
				}
				break;
			case T__113:
			case T__114:
				enterOuterAlt(_localctx, 4);
				{
				setState(1073);
				playMonopoly();
				}
				break;
			case T__119:
			case T__120:
				enterOuterAlt(_localctx, 5);
				{
				setState(1074);
				playYearOfPlenty();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PlaySoldierContext extends ParserRuleContext {
		public SoldierContext soldier() {
			return getRuleContext(SoldierContext.class,0);
		}
		public PlaySoldierContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_playSoldier; }
	}

	public final PlaySoldierContext playSoldier() throws RecognitionException {
		PlaySoldierContext _localctx = new PlaySoldierContext(_ctx, getState());
		enterRule(_localctx, 190, RULE_playSoldier);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1077);
			soldier();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PlayVictoryPointContext extends ParserRuleContext {
		public VictoryPointContext victoryPoint() {
			return getRuleContext(VictoryPointContext.class,0);
		}
		public PlayVictoryPointContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_playVictoryPoint; }
	}

	public final PlayVictoryPointContext playVictoryPoint() throws RecognitionException {
		PlayVictoryPointContext _localctx = new PlayVictoryPointContext(_ctx, getState());
		enterRule(_localctx, 192, RULE_playVictoryPoint);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1079);
			victoryPoint();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PlayRoadBuildingContext extends ParserRuleContext {
		public RoadBuildingContext roadBuilding() {
			return getRuleContext(RoadBuildingContext.class,0);
		}
		public PlayRoadBuildingContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_playRoadBuilding; }
	}

	public final PlayRoadBuildingContext playRoadBuilding() throws RecognitionException {
		PlayRoadBuildingContext _localctx = new PlayRoadBuildingContext(_ctx, getState());
		enterRule(_localctx, 194, RULE_playRoadBuilding);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1081);
			roadBuilding();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PlayMonopolyContext extends ParserRuleContext {
		public MonopolyContext monopoly() {
			return getRuleContext(MonopolyContext.class,0);
		}
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public ResourceContext resource() {
			return getRuleContext(ResourceContext.class,0);
		}
		public ResourceSetContext resourceSet() {
			return getRuleContext(ResourceSetContext.class,0);
		}
		public PlayMonopolyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_playMonopoly; }
	}

	public final PlayMonopolyContext playMonopoly() throws RecognitionException {
		PlayMonopolyContext _localctx = new PlayMonopolyContext(_ctx, getState());
		enterRule(_localctx, 196, RULE_playMonopoly);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1083);
			monopoly();
			setState(1084);
			match(SPACE);
			setState(1085);
			match(T__65);
			setState(1086);
			match(SPACE);
			setState(1087);
			resource();
			setState(1088);
			match(SPACE);
			setState(1089);
			match(T__43);
			setState(1090);
			match(SPACE);
			setState(1091);
			resourceSet();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PlayYearOfPlentyContext extends ParserRuleContext {
		public YearOfPlentyContext yearOfPlenty() {
			return getRuleContext(YearOfPlentyContext.class,0);
		}
		public TerminalNode SPACE() { return getToken(jsettlersParser.SPACE, 0); }
		public List<ResourceContext> resource() {
			return getRuleContexts(ResourceContext.class);
		}
		public ResourceContext resource(int i) {
			return getRuleContext(ResourceContext.class,i);
		}
		public PlayYearOfPlentyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_playYearOfPlenty; }
	}

	public final PlayYearOfPlentyContext playYearOfPlenty() throws RecognitionException {
		PlayYearOfPlentyContext _localctx = new PlayYearOfPlentyContext(_ctx, getState());
		enterRule(_localctx, 198, RULE_playYearOfPlenty);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1093);
			yearOfPlenty();
			setState(1094);
			match(SPACE);
			setState(1095);
			match(T__43);
			setState(1096);
			resource();
			setState(1097);
			resource();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class CheckItemContext extends ParserRuleContext {
		public TerminalNode INDENT() { return getToken(jsettlersParser.INDENT, 0); }
		public CheckPrefixContext checkPrefix() {
			return getRuleContext(CheckPrefixContext.class,0);
		}
		public TerminalNode SPACE() { return getToken(jsettlersParser.SPACE, 0); }
		public CheckContext check() {
			return getRuleContext(CheckContext.class,0);
		}
		public CheckItemContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_checkItem; }
	}

	public final CheckItemContext checkItem() throws RecognitionException {
		CheckItemContext _localctx = new CheckItemContext(_ctx, getState());
		enterRule(_localctx, 200, RULE_checkItem);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1099);
			match(INDENT);
			setState(1100);
			checkPrefix();
			setState(1101);
			match(SPACE);
			setState(1102);
			check();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class CheckPrefixContext extends ParserRuleContext {
		public TerminalNode U_CHECK() { return getToken(jsettlersParser.U_CHECK, 0); }
		public TerminalNode U_CHECK_GREEN() { return getToken(jsettlersParser.U_CHECK_GREEN, 0); }
		public CheckPrefixContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_checkPrefix; }
	}

	public final CheckPrefixContext checkPrefix() throws RecognitionException {
		CheckPrefixContext _localctx = new CheckPrefixContext(_ctx, getState());
		enterRule(_localctx, 202, RULE_checkPrefix);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1104);
			_la = _input.LA(1);
			if ( !(_la==T__66 || _la==T__67 || _la==U_CHECK || _la==U_CHECK_GREEN) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PrecisionContext extends ParserRuleContext {
		public AtLeastContext atLeast() {
			return getRuleContext(AtLeastContext.class,0);
		}
		public MoreThenContext moreThen() {
			return getRuleContext(MoreThenContext.class,0);
		}
		public MoreThenOrEqualContext moreThenOrEqual() {
			return getRuleContext(MoreThenOrEqualContext.class,0);
		}
		public ExactlyContext exactly() {
			return getRuleContext(ExactlyContext.class,0);
		}
		public LessThenContext lessThen() {
			return getRuleContext(LessThenContext.class,0);
		}
		public LessThenOrEqualContext lessThenOrEqual() {
			return getRuleContext(LessThenOrEqualContext.class,0);
		}
		public NotContext not() {
			return getRuleContext(NotContext.class,0);
		}
		public PrecisionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_precision; }
	}

	public final PrecisionContext precision() throws RecognitionException {
		PrecisionContext _localctx = new PrecisionContext(_ctx, getState());
		enterRule(_localctx, 204, RULE_precision);
		try {
			setState(1113);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__68:
				enterOuterAlt(_localctx, 1);
				{
				setState(1106);
				atLeast();
				}
				break;
			case T__69:
			case T__70:
				enterOuterAlt(_localctx, 2);
				{
				setState(1107);
				moreThen();
				}
				break;
			case T__71:
			case T__72:
				enterOuterAlt(_localctx, 3);
				{
				setState(1108);
				moreThenOrEqual();
				}
				break;
			case T__73:
			case T__74:
				enterOuterAlt(_localctx, 4);
				{
				setState(1109);
				exactly();
				}
				break;
			case T__75:
			case T__76:
				enterOuterAlt(_localctx, 5);
				{
				setState(1110);
				lessThen();
				}
				break;
			case T__77:
			case T__78:
				enterOuterAlt(_localctx, 6);
				{
				setState(1111);
				lessThenOrEqual();
				}
				break;
			case T__79:
			case T__80:
				enterOuterAlt(_localctx, 7);
				{
				setState(1112);
				not();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AtLeastContext extends ParserRuleContext {
		public AtLeastContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_atLeast; }
	}

	public final AtLeastContext atLeast() throws RecognitionException {
		AtLeastContext _localctx = new AtLeastContext(_ctx, getState());
		enterRule(_localctx, 206, RULE_atLeast);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1115);
			match(T__68);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class MoreThenContext extends ParserRuleContext {
		public MoreThenContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_moreThen; }
	}

	public final MoreThenContext moreThen() throws RecognitionException {
		MoreThenContext _localctx = new MoreThenContext(_ctx, getState());
		enterRule(_localctx, 208, RULE_moreThen);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1117);
			_la = _input.LA(1);
			if ( !(_la==T__69 || _la==T__70) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class MoreThenOrEqualContext extends ParserRuleContext {
		public MoreThenOrEqualContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_moreThenOrEqual; }
	}

	public final MoreThenOrEqualContext moreThenOrEqual() throws RecognitionException {
		MoreThenOrEqualContext _localctx = new MoreThenOrEqualContext(_ctx, getState());
		enterRule(_localctx, 210, RULE_moreThenOrEqual);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1119);
			_la = _input.LA(1);
			if ( !(_la==T__71 || _la==T__72) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ExactlyContext extends ParserRuleContext {
		public ExactlyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_exactly; }
	}

	public final ExactlyContext exactly() throws RecognitionException {
		ExactlyContext _localctx = new ExactlyContext(_ctx, getState());
		enterRule(_localctx, 212, RULE_exactly);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1121);
			_la = _input.LA(1);
			if ( !(_la==T__73 || _la==T__74) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class LessThenContext extends ParserRuleContext {
		public LessThenContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_lessThen; }
	}

	public final LessThenContext lessThen() throws RecognitionException {
		LessThenContext _localctx = new LessThenContext(_ctx, getState());
		enterRule(_localctx, 214, RULE_lessThen);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1123);
			_la = _input.LA(1);
			if ( !(_la==T__75 || _la==T__76) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class LessThenOrEqualContext extends ParserRuleContext {
		public LessThenOrEqualContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_lessThenOrEqual; }
	}

	public final LessThenOrEqualContext lessThenOrEqual() throws RecognitionException {
		LessThenOrEqualContext _localctx = new LessThenOrEqualContext(_ctx, getState());
		enterRule(_localctx, 216, RULE_lessThenOrEqual);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1125);
			_la = _input.LA(1);
			if ( !(_la==T__77 || _la==T__78) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class NotContext extends ParserRuleContext {
		public NotContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_not; }
	}

	public final NotContext not() throws RecognitionException {
		NotContext _localctx = new NotContext(_ctx, getState());
		enterRule(_localctx, 218, RULE_not);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1127);
			_la = _input.LA(1);
			if ( !(_la==T__79 || _la==T__80) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class CheckContext extends ParserRuleContext {
		public HasResourcesContext hasResources() {
			return getRuleContext(HasResourcesContext.class,0);
		}
		public HasAmountPiecesInStockContext hasAmountPiecesInStock() {
			return getRuleContext(HasAmountPiecesInStockContext.class,0);
		}
		public IsOnTurnContext isOnTurn() {
			return getRuleContext(IsOnTurnContext.class,0);
		}
		public IsNotOnTurnContext isNotOnTurn() {
			return getRuleContext(IsNotOnTurnContext.class,0);
		}
		public HasRoadAtContext hasRoadAt() {
			return getRuleContext(HasRoadAtContext.class,0);
		}
		public HasXRoadsContext hasXRoads() {
			return getRuleContext(HasXRoadsContext.class,0);
		}
		public HasTownAtContext hasTownAt() {
			return getRuleContext(HasTownAtContext.class,0);
		}
		public CheckContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_check; }
	}

	public final CheckContext check() throws RecognitionException {
		CheckContext _localctx = new CheckContext(_ctx, getState());
		enterRule(_localctx, 220, RULE_check);
		try {
			setState(1136);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,82,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(1129);
				hasResources();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(1130);
				hasAmountPiecesInStock();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(1131);
				isOnTurn();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(1132);
				isNotOnTurn();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(1133);
				hasRoadAt();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(1134);
				hasXRoads();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(1135);
				hasTownAt();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class HasResourcesContext extends ParserRuleContext {
		public PlayerContext player() {
			return getRuleContext(PlayerContext.class,0);
		}
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public ResourceSetContext resourceSet() {
			return getRuleContext(ResourceSetContext.class,0);
		}
		public HasResourcesContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_hasResources; }
	}

	public final HasResourcesContext hasResources() throws RecognitionException {
		HasResourcesContext _localctx = new HasResourcesContext(_ctx, getState());
		enterRule(_localctx, 222, RULE_hasResources);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1138);
			player();
			setState(1139);
			match(SPACE);
			setState(1140);
			match(T__81);
			setState(1141);
			match(SPACE);
			setState(1142);
			resourceSet();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class HasAmountPiecesInStockContext extends ParserRuleContext {
		public PlayerContext player() {
			return getRuleContext(PlayerContext.class,0);
		}
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public PrecisionContext precision() {
			return getRuleContext(PrecisionContext.class,0);
		}
		public TerminalNode NUMBER() { return getToken(jsettlersParser.NUMBER, 0); }
		public PieceContext piece() {
			return getRuleContext(PieceContext.class,0);
		}
		public HasAmountPiecesInStockContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_hasAmountPiecesInStock; }
	}

	public final HasAmountPiecesInStockContext hasAmountPiecesInStock() throws RecognitionException {
		HasAmountPiecesInStockContext _localctx = new HasAmountPiecesInStockContext(_ctx, getState());
		enterRule(_localctx, 224, RULE_hasAmountPiecesInStock);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1144);
			player();
			setState(1145);
			match(SPACE);
			setState(1146);
			match(T__81);
			setState(1147);
			match(SPACE);
			setState(1148);
			precision();
			setState(1149);
			match(SPACE);
			setState(1150);
			match(NUMBER);
			setState(1151);
			match(SPACE);
			setState(1152);
			piece();
			setState(1153);
			match(SPACE);
			setState(1154);
			match(T__82);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class IsNotOnTurnContext extends ParserRuleContext {
		public PlayerContext player() {
			return getRuleContext(PlayerContext.class,0);
		}
		public TerminalNode SPACE() { return getToken(jsettlersParser.SPACE, 0); }
		public IsNotOnTurnContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_isNotOnTurn; }
	}

	public final IsNotOnTurnContext isNotOnTurn() throws RecognitionException {
		IsNotOnTurnContext _localctx = new IsNotOnTurnContext(_ctx, getState());
		enterRule(_localctx, 226, RULE_isNotOnTurn);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1156);
			player();
			setState(1157);
			match(SPACE);
			setState(1158);
			match(T__83);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class IsOnTurnContext extends ParserRuleContext {
		public PlayerContext player() {
			return getRuleContext(PlayerContext.class,0);
		}
		public TerminalNode SPACE() { return getToken(jsettlersParser.SPACE, 0); }
		public IsOnTurnContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_isOnTurn; }
	}

	public final IsOnTurnContext isOnTurn() throws RecognitionException {
		IsOnTurnContext _localctx = new IsOnTurnContext(_ctx, getState());
		enterRule(_localctx, 228, RULE_isOnTurn);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1160);
			player();
			setState(1161);
			match(SPACE);
			setState(1162);
			match(T__84);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class HasRoadAtContext extends ParserRuleContext {
		public PlayerContext player() {
			return getRuleContext(PlayerContext.class,0);
		}
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public EdgeContext edge() {
			return getRuleContext(EdgeContext.class,0);
		}
		public AtContext at() {
			return getRuleContext(AtContext.class,0);
		}
		public HasRoadAtContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_hasRoadAt; }
	}

	public final HasRoadAtContext hasRoadAt() throws RecognitionException {
		HasRoadAtContext _localctx = new HasRoadAtContext(_ctx, getState());
		enterRule(_localctx, 230, RULE_hasRoadAt);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1164);
			player();
			setState(1165);
			match(SPACE);
			setState(1166);
			match(T__85);
			setState(1169);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,83,_ctx) ) {
			case 1:
				{
				setState(1167);
				match(SPACE);
				setState(1168);
				at();
				}
				break;
			}
			setState(1171);
			match(SPACE);
			setState(1172);
			edge();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class HasTownAtContext extends ParserRuleContext {
		public PlayerContext player() {
			return getRuleContext(PlayerContext.class,0);
		}
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public NodeContext node() {
			return getRuleContext(NodeContext.class,0);
		}
		public AtContext at() {
			return getRuleContext(AtContext.class,0);
		}
		public HasTownAtContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_hasTownAt; }
	}

	public final HasTownAtContext hasTownAt() throws RecognitionException {
		HasTownAtContext _localctx = new HasTownAtContext(_ctx, getState());
		enterRule(_localctx, 232, RULE_hasTownAt);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1174);
			player();
			setState(1175);
			match(SPACE);
			setState(1176);
			match(T__86);
			setState(1179);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,84,_ctx) ) {
			case 1:
				{
				setState(1177);
				match(SPACE);
				setState(1178);
				at();
				}
				break;
			}
			setState(1181);
			match(SPACE);
			setState(1182);
			node();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class HasXRoadsContext extends ParserRuleContext {
		public PlayerContext player() {
			return getRuleContext(PlayerContext.class,0);
		}
		public TerminalNode NUMBER() { return getToken(jsettlersParser.NUMBER, 0); }
		public HasXRoadsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_hasXRoads; }
	}

	public final HasXRoadsContext hasXRoads() throws RecognitionException {
		HasXRoadsContext _localctx = new HasXRoadsContext(_ctx, getState());
		enterRule(_localctx, 234, RULE_hasXRoads);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1184);
			player();
			setState(1185);
			match(T__87);
			setState(1186);
			match(NUMBER);
			setState(1187);
			match(T__41);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ResourceSetContext extends ParserRuleContext {
		public List<TerminalNode> SPACE() { return getTokens(jsettlersParser.SPACE); }
		public TerminalNode SPACE(int i) {
			return getToken(jsettlersParser.SPACE, i);
		}
		public List<ResourceContext> resource() {
			return getRuleContexts(ResourceContext.class);
		}
		public ResourceContext resource(int i) {
			return getRuleContext(ResourceContext.class,i);
		}
		public ResourceSetContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_resourceSet; }
	}

	public final ResourceSetContext resourceSet() throws RecognitionException {
		ResourceSetContext _localctx = new ResourceSetContext(_ctx, getState());
		enterRule(_localctx, 236, RULE_resourceSet);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(1189);
			match(T__12);
			setState(1193);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,85,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(1190);
					match(SPACE);
					}
					} 
				}
				setState(1195);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,85,_ctx);
			}
			setState(1202);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__31 || ((((_la - 89)) & ~0x3f) == 0 && ((1L << (_la - 89)) & ((1L << (T__88 - 89)) | (1L << (T__89 - 89)) | (1L << (T__90 - 89)) | (1L << (T__91 - 89)) | (1L << (T__92 - 89)) | (1L << (T__93 - 89)) | (1L << (T__94 - 89)) | (1L << (T__95 - 89)) | (1L << (T__96 - 89)) | (1L << (T__97 - 89)) | (1L << (T__98 - 89)) | (1L << (T__99 - 89)) | (1L << (T__100 - 89)) | (1L << (T__101 - 89)) | (1L << (T__102 - 89)) | (1L << (T__103 - 89)))) != 0)) {
				{
				{
				setState(1196);
				resource();
				setState(1198);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,86,_ctx) ) {
				case 1:
					{
					setState(1197);
					match(SPACE);
					}
					break;
				}
				}
				}
				setState(1204);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(1208);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==SPACE) {
				{
				{
				setState(1205);
				match(SPACE);
				}
				}
				setState(1210);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(1211);
			match(T__13);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ResourceContext extends ParserRuleContext {
		public SheepContext sheep() {
			return getRuleContext(SheepContext.class,0);
		}
		public WheatContext wheat() {
			return getRuleContext(WheatContext.class,0);
		}
		public TimberContext timber() {
			return getRuleContext(TimberContext.class,0);
		}
		public OreContext ore() {
			return getRuleContext(OreContext.class,0);
		}
		public BrickContext brick() {
			return getRuleContext(BrickContext.class,0);
		}
		public UnknownContext unknown() {
			return getRuleContext(UnknownContext.class,0);
		}
		public ResourceContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_resource; }
	}

	public final ResourceContext resource() throws RecognitionException {
		ResourceContext _localctx = new ResourceContext(_ctx, getState());
		enterRule(_localctx, 238, RULE_resource);
		try {
			setState(1219);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__31:
			case T__88:
			case T__89:
				enterOuterAlt(_localctx, 1);
				{
				setState(1213);
				sheep();
				}
				break;
			case T__93:
			case T__94:
			case T__95:
				enterOuterAlt(_localctx, 2);
				{
				setState(1214);
				wheat();
				}
				break;
			case T__90:
			case T__91:
			case T__92:
				enterOuterAlt(_localctx, 3);
				{
				setState(1215);
				timber();
				}
				break;
			case T__96:
			case T__97:
			case T__98:
				enterOuterAlt(_localctx, 4);
				{
				setState(1216);
				ore();
				}
				break;
			case T__99:
			case T__100:
			case T__101:
				enterOuterAlt(_localctx, 5);
				{
				setState(1217);
				brick();
				}
				break;
			case T__102:
			case T__103:
				enterOuterAlt(_localctx, 6);
				{
				setState(1218);
				unknown();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class SheepContext extends ParserRuleContext {
		public SheepContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_sheep; }
	}

	public final SheepContext sheep() throws RecognitionException {
		SheepContext _localctx = new SheepContext(_ctx, getState());
		enterRule(_localctx, 240, RULE_sheep);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1221);
			_la = _input.LA(1);
			if ( !(((((_la - 32)) & ~0x3f) == 0 && ((1L << (_la - 32)) & ((1L << (T__31 - 32)) | (1L << (T__88 - 32)) | (1L << (T__89 - 32)))) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class TimberContext extends ParserRuleContext {
		public TimberContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_timber; }
	}

	public final TimberContext timber() throws RecognitionException {
		TimberContext _localctx = new TimberContext(_ctx, getState());
		enterRule(_localctx, 242, RULE_timber);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1223);
			_la = _input.LA(1);
			if ( !(((((_la - 91)) & ~0x3f) == 0 && ((1L << (_la - 91)) & ((1L << (T__90 - 91)) | (1L << (T__91 - 91)) | (1L << (T__92 - 91)))) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class WheatContext extends ParserRuleContext {
		public WheatContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_wheat; }
	}

	public final WheatContext wheat() throws RecognitionException {
		WheatContext _localctx = new WheatContext(_ctx, getState());
		enterRule(_localctx, 244, RULE_wheat);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1225);
			_la = _input.LA(1);
			if ( !(((((_la - 94)) & ~0x3f) == 0 && ((1L << (_la - 94)) & ((1L << (T__93 - 94)) | (1L << (T__94 - 94)) | (1L << (T__95 - 94)))) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class OreContext extends ParserRuleContext {
		public OreContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_ore; }
	}

	public final OreContext ore() throws RecognitionException {
		OreContext _localctx = new OreContext(_ctx, getState());
		enterRule(_localctx, 246, RULE_ore);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1227);
			_la = _input.LA(1);
			if ( !(((((_la - 97)) & ~0x3f) == 0 && ((1L << (_la - 97)) & ((1L << (T__96 - 97)) | (1L << (T__97 - 97)) | (1L << (T__98 - 97)))) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class BrickContext extends ParserRuleContext {
		public BrickContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_brick; }
	}

	public final BrickContext brick() throws RecognitionException {
		BrickContext _localctx = new BrickContext(_ctx, getState());
		enterRule(_localctx, 248, RULE_brick);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1229);
			_la = _input.LA(1);
			if ( !(((((_la - 100)) & ~0x3f) == 0 && ((1L << (_la - 100)) & ((1L << (T__99 - 100)) | (1L << (T__100 - 100)) | (1L << (T__101 - 100)))) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class UnknownContext extends ParserRuleContext {
		public UnknownContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_unknown; }
	}

	public final UnknownContext unknown() throws RecognitionException {
		UnknownContext _localctx = new UnknownContext(_ctx, getState());
		enterRule(_localctx, 250, RULE_unknown);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1231);
			_la = _input.LA(1);
			if ( !(_la==T__102 || _la==T__103) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PieceContext extends ParserRuleContext {
		public CityContext city() {
			return getRuleContext(CityContext.class,0);
		}
		public TownContext town() {
			return getRuleContext(TownContext.class,0);
		}
		public ShipContext ship() {
			return getRuleContext(ShipContext.class,0);
		}
		public RoadContext road() {
			return getRuleContext(RoadContext.class,0);
		}
		public PieceContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_piece; }
	}

	public final PieceContext piece() throws RecognitionException {
		PieceContext _localctx = new PieceContext(_ctx, getState());
		enterRule(_localctx, 252, RULE_piece);
		try {
			setState(1237);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__106:
			case T__107:
				enterOuterAlt(_localctx, 1);
				{
				setState(1233);
				city();
				}
				break;
			case T__104:
			case T__105:
				enterOuterAlt(_localctx, 2);
				{
				setState(1234);
				town();
				}
				break;
			case T__108:
			case T__109:
				enterOuterAlt(_localctx, 3);
				{
				setState(1235);
				ship();
				}
				break;
			case T__110:
			case T__111:
				enterOuterAlt(_localctx, 4);
				{
				setState(1236);
				road();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class TownContext extends ParserRuleContext {
		public TownContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_town; }
	}

	public final TownContext town() throws RecognitionException {
		TownContext _localctx = new TownContext(_ctx, getState());
		enterRule(_localctx, 254, RULE_town);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1239);
			_la = _input.LA(1);
			if ( !(_la==T__104 || _la==T__105) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class CityContext extends ParserRuleContext {
		public CityContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_city; }
	}

	public final CityContext city() throws RecognitionException {
		CityContext _localctx = new CityContext(_ctx, getState());
		enterRule(_localctx, 256, RULE_city);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1241);
			_la = _input.LA(1);
			if ( !(_la==T__106 || _la==T__107) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ShipContext extends ParserRuleContext {
		public ShipContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_ship; }
	}

	public final ShipContext ship() throws RecognitionException {
		ShipContext _localctx = new ShipContext(_ctx, getState());
		enterRule(_localctx, 258, RULE_ship);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1243);
			_la = _input.LA(1);
			if ( !(_la==T__108 || _la==T__109) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class RoadContext extends ParserRuleContext {
		public RoadContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_road; }
	}

	public final RoadContext road() throws RecognitionException {
		RoadContext _localctx = new RoadContext(_ctx, getState());
		enterRule(_localctx, 260, RULE_road);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1245);
			_la = _input.LA(1);
			if ( !(_la==T__110 || _la==T__111) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class DevCardContext extends ParserRuleContext {
		public SoldierContext soldier() {
			return getRuleContext(SoldierContext.class,0);
		}
		public MonopolyContext monopoly() {
			return getRuleContext(MonopolyContext.class,0);
		}
		public RoadBuildingContext roadBuilding() {
			return getRuleContext(RoadBuildingContext.class,0);
		}
		public VictoryPointContext victoryPoint() {
			return getRuleContext(VictoryPointContext.class,0);
		}
		public YearOfPlentyContext yearOfPlenty() {
			return getRuleContext(YearOfPlentyContext.class,0);
		}
		public DevCardContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_devCard; }
	}

	public final DevCardContext devCard() throws RecognitionException {
		DevCardContext _localctx = new DevCardContext(_ctx, getState());
		enterRule(_localctx, 262, RULE_devCard);
		try {
			setState(1252);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__31:
			case T__112:
				enterOuterAlt(_localctx, 1);
				{
				setState(1247);
				soldier();
				}
				break;
			case T__113:
			case T__114:
				enterOuterAlt(_localctx, 2);
				{
				setState(1248);
				monopoly();
				}
				break;
			case T__115:
			case T__116:
				enterOuterAlt(_localctx, 3);
				{
				setState(1249);
				roadBuilding();
				}
				break;
			case T__117:
			case T__118:
				enterOuterAlt(_localctx, 4);
				{
				setState(1250);
				victoryPoint();
				}
				break;
			case T__119:
			case T__120:
				enterOuterAlt(_localctx, 5);
				{
				setState(1251);
				yearOfPlenty();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class SoldierContext extends ParserRuleContext {
		public SoldierContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_soldier; }
	}

	public final SoldierContext soldier() throws RecognitionException {
		SoldierContext _localctx = new SoldierContext(_ctx, getState());
		enterRule(_localctx, 264, RULE_soldier);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1254);
			_la = _input.LA(1);
			if ( !(_la==T__31 || _la==T__112) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class MonopolyContext extends ParserRuleContext {
		public MonopolyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_monopoly; }
	}

	public final MonopolyContext monopoly() throws RecognitionException {
		MonopolyContext _localctx = new MonopolyContext(_ctx, getState());
		enterRule(_localctx, 266, RULE_monopoly);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1256);
			_la = _input.LA(1);
			if ( !(_la==T__113 || _la==T__114) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class RoadBuildingContext extends ParserRuleContext {
		public RoadBuildingContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_roadBuilding; }
	}

	public final RoadBuildingContext roadBuilding() throws RecognitionException {
		RoadBuildingContext _localctx = new RoadBuildingContext(_ctx, getState());
		enterRule(_localctx, 268, RULE_roadBuilding);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1258);
			_la = _input.LA(1);
			if ( !(_la==T__115 || _la==T__116) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class VictoryPointContext extends ParserRuleContext {
		public VictoryPointContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_victoryPoint; }
	}

	public final VictoryPointContext victoryPoint() throws RecognitionException {
		VictoryPointContext _localctx = new VictoryPointContext(_ctx, getState());
		enterRule(_localctx, 270, RULE_victoryPoint);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1260);
			_la = _input.LA(1);
			if ( !(_la==T__117 || _la==T__118) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class YearOfPlentyContext extends ParserRuleContext {
		public YearOfPlentyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_yearOfPlenty; }
	}

	public final YearOfPlentyContext yearOfPlenty() throws RecognitionException {
		YearOfPlentyContext _localctx = new YearOfPlentyContext(_ctx, getState());
		enterRule(_localctx, 272, RULE_yearOfPlenty);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1262);
			_la = _input.LA(1);
			if ( !(_la==T__119 || _la==T__120) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PortContext extends ParserRuleContext {
		public Any3To1PortContext any3To1Port() {
			return getRuleContext(Any3To1PortContext.class,0);
		}
		public Any4To1PortContext any4To1Port() {
			return getRuleContext(Any4To1PortContext.class,0);
		}
		public Brick2To1PortContext brick2To1Port() {
			return getRuleContext(Brick2To1PortContext.class,0);
		}
		public Wheat2To1PortContext wheat2To1Port() {
			return getRuleContext(Wheat2To1PortContext.class,0);
		}
		public Timber2To1PortContext timber2To1Port() {
			return getRuleContext(Timber2To1PortContext.class,0);
		}
		public Ore2To1PortContext ore2To1Port() {
			return getRuleContext(Ore2To1PortContext.class,0);
		}
		public Sheep2To1PortContext sheep2To1Port() {
			return getRuleContext(Sheep2To1PortContext.class,0);
		}
		public FromBagPortContext fromBagPort() {
			return getRuleContext(FromBagPortContext.class,0);
		}
		public PortContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_port; }
	}

	public final PortContext port() throws RecognitionException {
		PortContext _localctx = new PortContext(_ctx, getState());
		enterRule(_localctx, 274, RULE_port);
		try {
			setState(1272);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,92,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(1264);
				any3To1Port();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(1265);
				any4To1Port();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(1266);
				brick2To1Port();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(1267);
				wheat2To1Port();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(1268);
				timber2To1Port();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(1269);
				ore2To1Port();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(1270);
				sheep2To1Port();
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(1271);
				fromBagPort();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PortPrefixContext extends ParserRuleContext {
		public TerminalNode U_PORT() { return getToken(jsettlersParser.U_PORT, 0); }
		public PortPrefixContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_portPrefix; }
	}

	public final PortPrefixContext portPrefix() throws RecognitionException {
		PortPrefixContext _localctx = new PortPrefixContext(_ctx, getState());
		enterRule(_localctx, 276, RULE_portPrefix);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1274);
			_la = _input.LA(1);
			if ( !(_la==T__121 || _la==U_PORT) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Any3To1PortContext extends ParserRuleContext {
		public PortPrefixContext portPrefix() {
			return getRuleContext(PortPrefixContext.class,0);
		}
		public Any3To1PortContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_any3To1Port; }
	}

	public final Any3To1PortContext any3To1Port() throws RecognitionException {
		Any3To1PortContext _localctx = new Any3To1PortContext(_ctx, getState());
		enterRule(_localctx, 278, RULE_any3To1Port);
		try {
			setState(1280);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__122:
				enterOuterAlt(_localctx, 1);
				{
				setState(1276);
				match(T__122);
				}
				break;
			case T__121:
			case U_PORT:
				enterOuterAlt(_localctx, 2);
				{
				setState(1277);
				portPrefix();
				setState(1278);
				match(T__123);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Any4To1PortContext extends ParserRuleContext {
		public PortPrefixContext portPrefix() {
			return getRuleContext(PortPrefixContext.class,0);
		}
		public Any4To1PortContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_any4To1Port; }
	}

	public final Any4To1PortContext any4To1Port() throws RecognitionException {
		Any4To1PortContext _localctx = new Any4To1PortContext(_ctx, getState());
		enterRule(_localctx, 280, RULE_any4To1Port);
		try {
			setState(1286);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__124:
				enterOuterAlt(_localctx, 1);
				{
				setState(1282);
				match(T__124);
				}
				break;
			case T__121:
			case U_PORT:
				enterOuterAlt(_localctx, 2);
				{
				setState(1283);
				portPrefix();
				setState(1284);
				match(T__125);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Brick2To1PortContext extends ParserRuleContext {
		public PortPrefixContext portPrefix() {
			return getRuleContext(PortPrefixContext.class,0);
		}
		public BrickContext brick() {
			return getRuleContext(BrickContext.class,0);
		}
		public Brick2To1PortContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_brick2To1Port; }
	}

	public final Brick2To1PortContext brick2To1Port() throws RecognitionException {
		Brick2To1PortContext _localctx = new Brick2To1PortContext(_ctx, getState());
		enterRule(_localctx, 282, RULE_brick2To1Port);
		try {
			setState(1292);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__126:
				enterOuterAlt(_localctx, 1);
				{
				setState(1288);
				match(T__126);
				}
				break;
			case T__121:
			case U_PORT:
				enterOuterAlt(_localctx, 2);
				{
				setState(1289);
				portPrefix();
				setState(1290);
				brick();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Wheat2To1PortContext extends ParserRuleContext {
		public PortPrefixContext portPrefix() {
			return getRuleContext(PortPrefixContext.class,0);
		}
		public WheatContext wheat() {
			return getRuleContext(WheatContext.class,0);
		}
		public Wheat2To1PortContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_wheat2To1Port; }
	}

	public final Wheat2To1PortContext wheat2To1Port() throws RecognitionException {
		Wheat2To1PortContext _localctx = new Wheat2To1PortContext(_ctx, getState());
		enterRule(_localctx, 284, RULE_wheat2To1Port);
		try {
			setState(1298);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__127:
				enterOuterAlt(_localctx, 1);
				{
				setState(1294);
				match(T__127);
				}
				break;
			case T__121:
			case U_PORT:
				enterOuterAlt(_localctx, 2);
				{
				setState(1295);
				portPrefix();
				setState(1296);
				wheat();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Timber2To1PortContext extends ParserRuleContext {
		public PortPrefixContext portPrefix() {
			return getRuleContext(PortPrefixContext.class,0);
		}
		public TimberContext timber() {
			return getRuleContext(TimberContext.class,0);
		}
		public Timber2To1PortContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_timber2To1Port; }
	}

	public final Timber2To1PortContext timber2To1Port() throws RecognitionException {
		Timber2To1PortContext _localctx = new Timber2To1PortContext(_ctx, getState());
		enterRule(_localctx, 286, RULE_timber2To1Port);
		try {
			setState(1304);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__128:
				enterOuterAlt(_localctx, 1);
				{
				setState(1300);
				match(T__128);
				}
				break;
			case T__121:
			case U_PORT:
				enterOuterAlt(_localctx, 2);
				{
				setState(1301);
				portPrefix();
				setState(1302);
				timber();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Ore2To1PortContext extends ParserRuleContext {
		public PortPrefixContext portPrefix() {
			return getRuleContext(PortPrefixContext.class,0);
		}
		public OreContext ore() {
			return getRuleContext(OreContext.class,0);
		}
		public Ore2To1PortContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_ore2To1Port; }
	}

	public final Ore2To1PortContext ore2To1Port() throws RecognitionException {
		Ore2To1PortContext _localctx = new Ore2To1PortContext(_ctx, getState());
		enterRule(_localctx, 288, RULE_ore2To1Port);
		try {
			setState(1310);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__129:
				enterOuterAlt(_localctx, 1);
				{
				setState(1306);
				match(T__129);
				}
				break;
			case T__121:
			case U_PORT:
				enterOuterAlt(_localctx, 2);
				{
				setState(1307);
				portPrefix();
				setState(1308);
				ore();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Sheep2To1PortContext extends ParserRuleContext {
		public PortPrefixContext portPrefix() {
			return getRuleContext(PortPrefixContext.class,0);
		}
		public SheepContext sheep() {
			return getRuleContext(SheepContext.class,0);
		}
		public Sheep2To1PortContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_sheep2To1Port; }
	}

	public final Sheep2To1PortContext sheep2To1Port() throws RecognitionException {
		Sheep2To1PortContext _localctx = new Sheep2To1PortContext(_ctx, getState());
		enterRule(_localctx, 290, RULE_sheep2To1Port);
		try {
			setState(1316);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__130:
				enterOuterAlt(_localctx, 1);
				{
				setState(1312);
				match(T__130);
				}
				break;
			case T__121:
			case U_PORT:
				enterOuterAlt(_localctx, 2);
				{
				setState(1313);
				portPrefix();
				setState(1314);
				sheep();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class FromBagPortContext extends ParserRuleContext {
		public PortPrefixContext portPrefix() {
			return getRuleContext(PortPrefixContext.class,0);
		}
		public TerminalNode U_BAG() { return getToken(jsettlersParser.U_BAG, 0); }
		public FromBagPortContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_fromBagPort; }
	}

	public final FromBagPortContext fromBagPort() throws RecognitionException {
		FromBagPortContext _localctx = new FromBagPortContext(_ctx, getState());
		enterRule(_localctx, 292, RULE_fromBagPort);
		try {
			setState(1322);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__131:
				enterOuterAlt(_localctx, 1);
				{
				setState(1318);
				match(T__131);
				}
				break;
			case T__121:
			case U_PORT:
				enterOuterAlt(_localctx, 2);
				{
				setState(1319);
				portPrefix();
				setState(1320);
				match(U_BAG);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class HexContext extends ParserRuleContext {
		public PastureContext pasture() {
			return getRuleContext(PastureContext.class,0);
		}
		public ForestContext forest() {
			return getRuleContext(ForestContext.class,0);
		}
		public MountainContext mountain() {
			return getRuleContext(MountainContext.class,0);
		}
		public RiverContext river() {
			return getRuleContext(RiverContext.class,0);
		}
		public WheatFieldContext wheatField() {
			return getRuleContext(WheatFieldContext.class,0);
		}
		public SeaContext sea() {
			return getRuleContext(SeaContext.class,0);
		}
		public NoneContext none() {
			return getRuleContext(NoneContext.class,0);
		}
		public DesertContext desert() {
			return getRuleContext(DesertContext.class,0);
		}
		public HexContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_hex; }
	}

	public final HexContext hex() throws RecognitionException {
		HexContext _localctx = new HexContext(_ctx, getState());
		enterRule(_localctx, 294, RULE_hex);
		try {
			setState(1332);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__132:
			case T__133:
				enterOuterAlt(_localctx, 1);
				{
				setState(1324);
				pasture();
				}
				break;
			case T__91:
			case T__134:
				enterOuterAlt(_localctx, 2);
				{
				setState(1325);
				forest();
				}
				break;
			case T__135:
			case T__136:
				enterOuterAlt(_localctx, 3);
				{
				setState(1326);
				mountain();
				}
				break;
			case T__137:
			case T__138:
				enterOuterAlt(_localctx, 4);
				{
				setState(1327);
				river();
				}
				break;
			case T__139:
			case T__140:
				enterOuterAlt(_localctx, 5);
				{
				setState(1328);
				wheatField();
				}
				break;
			case T__141:
			case T__142:
				enterOuterAlt(_localctx, 6);
				{
				setState(1329);
				sea();
				}
				break;
			case T__32:
			case T__143:
				enterOuterAlt(_localctx, 7);
				{
				setState(1330);
				none();
				}
				break;
			case T__144:
			case T__145:
				enterOuterAlt(_localctx, 8);
				{
				setState(1331);
				desert();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PastureContext extends ParserRuleContext {
		public PastureContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_pasture; }
	}

	public final PastureContext pasture() throws RecognitionException {
		PastureContext _localctx = new PastureContext(_ctx, getState());
		enterRule(_localctx, 296, RULE_pasture);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1334);
			_la = _input.LA(1);
			if ( !(_la==T__132 || _la==T__133) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ForestContext extends ParserRuleContext {
		public ForestContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_forest; }
	}

	public final ForestContext forest() throws RecognitionException {
		ForestContext _localctx = new ForestContext(_ctx, getState());
		enterRule(_localctx, 298, RULE_forest);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1336);
			_la = _input.LA(1);
			if ( !(_la==T__91 || _la==T__134) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class MountainContext extends ParserRuleContext {
		public MountainContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_mountain; }
	}

	public final MountainContext mountain() throws RecognitionException {
		MountainContext _localctx = new MountainContext(_ctx, getState());
		enterRule(_localctx, 300, RULE_mountain);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1338);
			_la = _input.LA(1);
			if ( !(_la==T__135 || _la==T__136) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class RiverContext extends ParserRuleContext {
		public RiverContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_river; }
	}

	public final RiverContext river() throws RecognitionException {
		RiverContext _localctx = new RiverContext(_ctx, getState());
		enterRule(_localctx, 302, RULE_river);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1340);
			_la = _input.LA(1);
			if ( !(_la==T__137 || _la==T__138) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class WheatFieldContext extends ParserRuleContext {
		public WheatFieldContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_wheatField; }
	}

	public final WheatFieldContext wheatField() throws RecognitionException {
		WheatFieldContext _localctx = new WheatFieldContext(_ctx, getState());
		enterRule(_localctx, 304, RULE_wheatField);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1342);
			_la = _input.LA(1);
			if ( !(_la==T__139 || _la==T__140) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class SeaContext extends ParserRuleContext {
		public SeaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_sea; }
	}

	public final SeaContext sea() throws RecognitionException {
		SeaContext _localctx = new SeaContext(_ctx, getState());
		enterRule(_localctx, 306, RULE_sea);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1344);
			_la = _input.LA(1);
			if ( !(_la==T__141 || _la==T__142) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class NoneContext extends ParserRuleContext {
		public NoneContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_none; }
	}

	public final NoneContext none() throws RecognitionException {
		NoneContext _localctx = new NoneContext(_ctx, getState());
		enterRule(_localctx, 308, RULE_none);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1346);
			_la = _input.LA(1);
			if ( !(_la==T__32 || _la==T__143) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class DesertContext extends ParserRuleContext {
		public DesertContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_desert; }
	}

	public final DesertContext desert() throws RecognitionException {
		DesertContext _localctx = new DesertContext(_ctx, getState());
		enterRule(_localctx, 310, RULE_desert);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1348);
			_la = _input.LA(1);
			if ( !(_la==T__144 || _la==T__145) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class VictoryPointtContext extends ParserRuleContext {
		public CityContext city() {
			return getRuleContext(CityContext.class,0);
		}
		public TownContext town() {
			return getRuleContext(TownContext.class,0);
		}
		public VictoryPointContext victoryPoint() {
			return getRuleContext(VictoryPointContext.class,0);
		}
		public LongestRoadContext longestRoad() {
			return getRuleContext(LongestRoadContext.class,0);
		}
		public LargestArmyContext largestArmy() {
			return getRuleContext(LargestArmyContext.class,0);
		}
		public VictoryPointtContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_victoryPointt; }
	}

	public final VictoryPointtContext victoryPointt() throws RecognitionException {
		VictoryPointtContext _localctx = new VictoryPointtContext(_ctx, getState());
		enterRule(_localctx, 312, RULE_victoryPointt);
		try {
			setState(1355);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__106:
			case T__107:
				enterOuterAlt(_localctx, 1);
				{
				setState(1350);
				city();
				}
				break;
			case T__104:
			case T__105:
				enterOuterAlt(_localctx, 2);
				{
				setState(1351);
				town();
				}
				break;
			case T__117:
			case T__118:
				enterOuterAlt(_localctx, 3);
				{
				setState(1352);
				victoryPoint();
				}
				break;
			case T__146:
			case T__147:
				enterOuterAlt(_localctx, 4);
				{
				setState(1353);
				longestRoad();
				}
				break;
			case T__148:
			case T__149:
				enterOuterAlt(_localctx, 5);
				{
				setState(1354);
				largestArmy();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class LongestRoadContext extends ParserRuleContext {
		public LongestRoadContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_longestRoad; }
	}

	public final LongestRoadContext longestRoad() throws RecognitionException {
		LongestRoadContext _localctx = new LongestRoadContext(_ctx, getState());
		enterRule(_localctx, 314, RULE_longestRoad);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1357);
			_la = _input.LA(1);
			if ( !(_la==T__146 || _la==T__147) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class LargestArmyContext extends ParserRuleContext {
		public LargestArmyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_largestArmy; }
	}

	public final LargestArmyContext largestArmy() throws RecognitionException {
		LargestArmyContext _localctx = new LargestArmyContext(_ctx, getState());
		enterRule(_localctx, 316, RULE_largestArmy);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1359);
			_la = _input.LA(1);
			if ( !(_la==T__148 || _la==T__149) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class RoadBuildingTokenContext extends ParserRuleContext {
		public RoadBuildingTokenContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_roadBuildingToken; }
	}

	public final RoadBuildingTokenContext roadBuildingToken() throws RecognitionException {
		RoadBuildingTokenContext _localctx = new RoadBuildingTokenContext(_ctx, getState());
		enterRule(_localctx, 318, RULE_roadBuildingToken);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1361);
			_la = _input.LA(1);
			if ( !(_la==T__150 || _la==T__151) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3\u00a8\u0556\4\2\t"+
		"\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13"+
		"\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22\t\22"+
		"\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\4\27\t\27\4\30\t\30\4\31\t\31"+
		"\4\32\t\32\4\33\t\33\4\34\t\34\4\35\t\35\4\36\t\36\4\37\t\37\4 \t \4!"+
		"\t!\4\"\t\"\4#\t#\4$\t$\4%\t%\4&\t&\4\'\t\'\4(\t(\4)\t)\4*\t*\4+\t+\4"+
		",\t,\4-\t-\4.\t.\4/\t/\4\60\t\60\4\61\t\61\4\62\t\62\4\63\t\63\4\64\t"+
		"\64\4\65\t\65\4\66\t\66\4\67\t\67\48\t8\49\t9\4:\t:\4;\t;\4<\t<\4=\t="+
		"\4>\t>\4?\t?\4@\t@\4A\tA\4B\tB\4C\tC\4D\tD\4E\tE\4F\tF\4G\tG\4H\tH\4I"+
		"\tI\4J\tJ\4K\tK\4L\tL\4M\tM\4N\tN\4O\tO\4P\tP\4Q\tQ\4R\tR\4S\tS\4T\tT"+
		"\4U\tU\4V\tV\4W\tW\4X\tX\4Y\tY\4Z\tZ\4[\t[\4\\\t\\\4]\t]\4^\t^\4_\t_\4"+
		"`\t`\4a\ta\4b\tb\4c\tc\4d\td\4e\te\4f\tf\4g\tg\4h\th\4i\ti\4j\tj\4k\t"+
		"k\4l\tl\4m\tm\4n\tn\4o\to\4p\tp\4q\tq\4r\tr\4s\ts\4t\tt\4u\tu\4v\tv\4"+
		"w\tw\4x\tx\4y\ty\4z\tz\4{\t{\4|\t|\4}\t}\4~\t~\4\177\t\177\4\u0080\t\u0080"+
		"\4\u0081\t\u0081\4\u0082\t\u0082\4\u0083\t\u0083\4\u0084\t\u0084\4\u0085"+
		"\t\u0085\4\u0086\t\u0086\4\u0087\t\u0087\4\u0088\t\u0088\4\u0089\t\u0089"+
		"\4\u008a\t\u008a\4\u008b\t\u008b\4\u008c\t\u008c\4\u008d\t\u008d\4\u008e"+
		"\t\u008e\4\u008f\t\u008f\4\u0090\t\u0090\4\u0091\t\u0091\4\u0092\t\u0092"+
		"\4\u0093\t\u0093\4\u0094\t\u0094\4\u0095\t\u0095\4\u0096\t\u0096\4\u0097"+
		"\t\u0097\4\u0098\t\u0098\4\u0099\t\u0099\4\u009a\t\u009a\4\u009b\t\u009b"+
		"\4\u009c\t\u009c\4\u009d\t\u009d\4\u009e\t\u009e\4\u009f\t\u009f\4\u00a0"+
		"\t\u00a0\4\u00a1\t\u00a1\3\2\3\2\3\3\3\3\3\4\3\4\3\4\3\4\3\4\5\4\u014c"+
		"\n\4\3\5\3\5\3\5\3\5\3\5\5\5\u0153\n\5\3\5\3\5\3\5\5\5\u0158\n\5\3\5\3"+
		"\5\3\5\6\5\u015d\n\5\r\5\16\5\u015e\3\6\3\6\3\6\3\6\3\6\3\6\3\6\3\6\7"+
		"\6\u0169\n\6\f\6\16\6\u016c\13\6\3\7\3\7\3\7\3\7\3\7\5\7\u0173\n\7\3\b"+
		"\3\b\3\b\5\b\u0178\n\b\3\b\3\b\5\b\u017c\n\b\3\t\3\t\3\t\5\t\u0181\n\t"+
		"\3\t\3\t\5\t\u0185\n\t\3\n\3\n\3\13\3\13\3\13\3\13\3\13\3\13\3\13\3\13"+
		"\7\13\u0191\n\13\f\13\16\13\u0194\13\13\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3"+
		"\f\5\f\u019e\n\f\3\r\3\r\3\r\3\r\3\r\3\r\3\r\3\r\3\r\5\r\u01a9\n\r\7\r"+
		"\u01ab\n\r\f\r\16\r\u01ae\13\r\3\r\3\r\3\16\3\16\3\16\3\16\3\16\3\16\3"+
		"\16\3\16\3\17\3\17\3\17\3\17\3\17\3\17\3\17\3\17\3\20\3\20\3\20\3\20\3"+
		"\20\3\20\3\21\3\21\3\21\5\21\u01cb\n\21\3\22\3\22\3\23\3\23\3\24\3\24"+
		"\3\25\3\25\3\25\3\25\3\25\3\25\3\26\3\26\3\27\3\27\3\30\3\30\3\30\3\30"+
		"\3\31\3\31\3\32\3\32\5\32\u01e5\n\32\3\33\3\33\3\34\3\34\3\35\3\35\3\36"+
		"\3\36\3\37\3\37\5\37\u01f1\n\37\3 \3 \3 \3 \3!\3!\3!\3!\3!\3!\3\"\3\""+
		"\3\"\3\"\3\"\3\"\3\"\3\"\7\"\u0205\n\"\f\"\16\"\u0208\13\"\3#\3#\5#\u020c"+
		"\n#\3$\3$\3$\6$\u0211\n$\r$\16$\u0212\3%\3%\6%\u0217\n%\r%\16%\u0218\3"+
		"&\3&\3&\3&\3&\3&\3&\3&\7&\u0223\n&\f&\16&\u0226\13&\3\'\3\'\5\'\u022a"+
		"\n\'\3(\3(\3)\3)\5)\u0230\n)\3*\3*\3*\3*\5*\u0236\n*\3*\5*\u0239\n*\3"+
		"*\5*\u023c\n*\6*\u023e\n*\r*\16*\u023f\3+\3+\5+\u0244\n+\3+\5+\u0247\n"+
		"+\3+\5+\u024a\n+\3+\6+\u024d\n+\r+\16+\u024e\3,\3,\3,\3,\3,\3,\3,\3,\7"+
		",\u0259\n,\f,\16,\u025c\13,\3-\3-\5-\u0260\n-\3.\3.\3/\3/\3\60\3\60\3"+
		"\60\5\60\u0269\n\60\3\61\3\61\3\61\3\61\5\61\u026f\n\61\3\61\5\61\u0272"+
		"\n\61\3\61\5\61\u0275\n\61\6\61\u0277\n\61\r\61\16\61\u0278\3\62\3\62"+
		"\5\62\u027d\n\62\3\62\5\62\u0280\n\62\3\62\5\62\u0283\n\62\3\62\6\62\u0286"+
		"\n\62\r\62\16\62\u0287\3\63\3\63\3\63\3\63\3\63\3\63\3\63\3\63\7\63\u0292"+
		"\n\63\f\63\16\63\u0295\13\63\3\64\3\64\3\64\3\64\3\64\3\64\3\65\3\65\3"+
		"\65\3\65\3\65\3\65\3\65\3\65\7\65\u02a5\n\65\f\65\16\65\u02a8\13\65\3"+
		"\66\3\66\5\66\u02ac\n\66\3\66\3\66\3\66\3\67\3\67\3\67\38\38\38\39\39"+
		"\39\39\39\39\39\39\59\u02bf\n9\3:\3:\3:\3:\3;\3;\3;\3;\3;\5;\u02ca\n;"+
		"\7;\u02cc\n;\f;\16;\u02cf\13;\3;\3;\3<\3<\3<\3<\3=\3=\3=\3=\3=\5=\u02dc"+
		"\n=\7=\u02de\n=\f=\16=\u02e1\13=\3=\3=\3>\3>\3>\3>\3>\5>\u02ea\n>\7>\u02ec"+
		"\n>\f>\16>\u02ef\13>\3>\3>\3?\3?\3?\3?\3?\5?\u02f8\n?\7?\u02fa\n?\f?\16"+
		"?\u02fd\13?\3?\3?\3@\3@\3@\3@\3@\5@\u0306\n@\7@\u0308\n@\f@\16@\u030b"+
		"\13@\3@\3@\3A\3A\3A\3A\3A\5A\u0314\nA\7A\u0316\nA\fA\16A\u0319\13A\3A"+
		"\3A\3B\3B\3B\3B\3B\5B\u0322\nB\7B\u0324\nB\fB\16B\u0327\13B\3B\3B\3C\3"+
		"C\5C\u032d\nC\3D\3D\3D\3D\3D\3D\7D\u0335\nD\fD\16D\u0338\13D\3E\3E\3E"+
		"\3E\5E\u033e\nE\3E\3E\3E\3E\5E\u0344\nE\3F\3F\3F\3F\3F\3F\6F\u034c\nF"+
		"\rF\16F\u034d\3G\3G\3G\3G\3G\3G\3G\3G\3G\7G\u0359\nG\fG\16G\u035c\13G"+
		"\3H\3H\5H\u0360\nH\3I\3I\3I\3I\3I\3I\3I\3I\3I\3I\3I\3I\3I\3I\3I\3I\3I"+
		"\5I\u0373\nI\3J\3J\3K\3K\3K\3K\3L\3L\3L\3L\5L\u037f\nL\3L\3L\3L\3L\3L"+
		"\5L\u0386\nL\3L\3L\3M\3M\3M\3M\5M\u038e\nM\3M\3M\3M\3M\3M\5M\u0395\nM"+
		"\3M\3M\3N\3N\3N\3N\5N\u039d\nN\3N\3N\3N\3N\3N\5N\u03a4\nN\3N\3N\3O\3O"+
		"\3O\3O\5O\u03ac\nO\3O\3O\3O\3O\3O\5O\u03b3\nO\3O\3O\3P\3P\3P\3P\3P\3P"+
		"\3P\3P\3P\3P\3Q\3Q\3Q\3Q\3Q\3Q\3R\3R\3R\5R\u03ca\nR\3S\3S\3S\3T\3T\3T"+
		"\3T\3U\3U\3U\3U\7U\u03d7\nU\fU\16U\u03da\13U\5U\u03dc\nU\3U\3U\3V\3V\3"+
		"V\3V\3V\3V\3V\3V\3V\3V\3W\3W\3W\3W\3W\3W\3W\3W\3W\3W\3X\3X\3X\3X\3X\3"+
		"X\3Y\3Y\3Y\3Y\3Y\3Y\3Z\3Z\3Z\3Z\3Z\3Z\3Z\3Z\3Z\3Z\3[\3[\3[\3[\3[\3[\3"+
		"[\3[\3[\3[\3[\3[\3[\3[\3\\\3\\\3\\\3\\\3\\\3\\\3]\3]\3]\3]\3]\3]\3]\3"+
		"]\3]\3]\3^\3^\3^\3^\3_\3_\3_\3_\3_\3`\3`\3`\3`\3`\5`\u0436\n`\3a\3a\3"+
		"b\3b\3c\3c\3d\3d\3d\3d\3d\3d\3d\3d\3d\3d\3e\3e\3e\3e\3e\3e\3f\3f\3f\3"+
		"f\3f\3g\3g\3h\3h\3h\3h\3h\3h\3h\5h\u045c\nh\3i\3i\3j\3j\3k\3k\3l\3l\3"+
		"m\3m\3n\3n\3o\3o\3p\3p\3p\3p\3p\3p\3p\5p\u0473\np\3q\3q\3q\3q\3q\3q\3"+
		"r\3r\3r\3r\3r\3r\3r\3r\3r\3r\3r\3r\3s\3s\3s\3s\3t\3t\3t\3t\3u\3u\3u\3"+
		"u\3u\5u\u0494\nu\3u\3u\3u\3v\3v\3v\3v\3v\5v\u049e\nv\3v\3v\3v\3w\3w\3"+
		"w\3w\3w\3x\3x\7x\u04aa\nx\fx\16x\u04ad\13x\3x\3x\5x\u04b1\nx\7x\u04b3"+
		"\nx\fx\16x\u04b6\13x\3x\7x\u04b9\nx\fx\16x\u04bc\13x\3x\3x\3y\3y\3y\3"+
		"y\3y\3y\5y\u04c6\ny\3z\3z\3{\3{\3|\3|\3}\3}\3~\3~\3\177\3\177\3\u0080"+
		"\3\u0080\3\u0080\3\u0080\5\u0080\u04d8\n\u0080\3\u0081\3\u0081\3\u0082"+
		"\3\u0082\3\u0083\3\u0083\3\u0084\3\u0084\3\u0085\3\u0085\3\u0085\3\u0085"+
		"\3\u0085\5\u0085\u04e7\n\u0085\3\u0086\3\u0086\3\u0087\3\u0087\3\u0088"+
		"\3\u0088\3\u0089\3\u0089\3\u008a\3\u008a\3\u008b\3\u008b\3\u008b\3\u008b"+
		"\3\u008b\3\u008b\3\u008b\3\u008b\5\u008b\u04fb\n\u008b\3\u008c\3\u008c"+
		"\3\u008d\3\u008d\3\u008d\3\u008d\5\u008d\u0503\n\u008d\3\u008e\3\u008e"+
		"\3\u008e\3\u008e\5\u008e\u0509\n\u008e\3\u008f\3\u008f\3\u008f\3\u008f"+
		"\5\u008f\u050f\n\u008f\3\u0090\3\u0090\3\u0090\3\u0090\5\u0090\u0515\n"+
		"\u0090\3\u0091\3\u0091\3\u0091\3\u0091\5\u0091\u051b\n\u0091\3\u0092\3"+
		"\u0092\3\u0092\3\u0092\5\u0092\u0521\n\u0092\3\u0093\3\u0093\3\u0093\3"+
		"\u0093\5\u0093\u0527\n\u0093\3\u0094\3\u0094\3\u0094\3\u0094\5\u0094\u052d"+
		"\n\u0094\3\u0095\3\u0095\3\u0095\3\u0095\3\u0095\3\u0095\3\u0095\3\u0095"+
		"\5\u0095\u0537\n\u0095\3\u0096\3\u0096\3\u0097\3\u0097\3\u0098\3\u0098"+
		"\3\u0099\3\u0099\3\u009a\3\u009a\3\u009b\3\u009b\3\u009c\3\u009c\3\u009d"+
		"\3\u009d\3\u009e\3\u009e\3\u009e\3\u009e\3\u009e\5\u009e\u054e\n\u009e"+
		"\3\u009f\3\u009f\3\u00a0\3\u00a0\3\u00a1\3\u00a1\3\u00a1\2\2\u00a2\2\4"+
		"\6\b\n\f\16\20\22\24\26\30\32\34\36 \"$&(*,.\60\62\64\668:<>@BDFHJLNP"+
		"RTVXZ\\^`bdfhjlnprtvxz|~\u0080\u0082\u0084\u0086\u0088\u008a\u008c\u008e"+
		"\u0090\u0092\u0094\u0096\u0098\u009a\u009c\u009e\u00a0\u00a2\u00a4\u00a6"+
		"\u00a8\u00aa\u00ac\u00ae\u00b0\u00b2\u00b4\u00b6\u00b8\u00ba\u00bc\u00be"+
		"\u00c0\u00c2\u00c4\u00c6\u00c8\u00ca\u00cc\u00ce\u00d0\u00d2\u00d4\u00d6"+
		"\u00d8\u00da\u00dc\u00de\u00e0\u00e2\u00e4\u00e6\u00e8\u00ea\u00ec\u00ee"+
		"\u00f0\u00f2\u00f4\u00f6\u00f8\u00fa\u00fc\u00fe\u0100\u0102\u0104\u0106"+
		"\u0108\u010a\u010c\u010e\u0110\u0112\u0114\u0116\u0118\u011a\u011c\u011e"+
		"\u0120\u0122\u0124\u0126\u0128\u012a\u012c\u012e\u0130\u0132\u0134\u0136"+
		"\u0138\u013a\u013c\u013e\u0140\2-\3\2\3\4\4\2\5\5\u00a7\u00a7\3\2\n\f"+
		"\4\2\25\25\u00a5\u00a5\4\2\26\26\u00a4\u00a4\3\2\37 \3\2!\"\3\2$%\4\2"+
		"\61\62\u009f\u009f\4\2EF\u00a2\u00a3\3\2HI\3\2JK\3\2LM\3\2NO\3\2PQ\3\2"+
		"RS\4\2\"\"[\\\3\2]_\3\2`b\3\2ce\3\2fh\3\2ij\3\2kl\3\2mn\3\2op\3\2qr\4"+
		"\2\"\"ss\3\2tu\3\2vw\3\2xy\3\2z{\4\2||\u00a1\u00a1\3\2\u0087\u0088\4\2"+
		"^^\u0089\u0089\3\2\u008a\u008b\3\2\u008c\u008d\3\2\u008e\u008f\3\2\u0090"+
		"\u0091\4\2##\u0092\u0092\3\2\u0093\u0094\3\2\u0095\u0096\3\2\u0097\u0098"+
		"\3\2\u0099\u009a\2\u0564\2\u0142\3\2\2\2\4\u0144\3\2\2\2\6\u0146\3\2\2"+
		"\2\b\u014d\3\2\2\2\n\u0160\3\2\2\2\f\u0172\3\2\2\2\16\u0174\3\2\2\2\20"+
		"\u017d\3\2\2\2\22\u0186\3\2\2\2\24\u0188\3\2\2\2\26\u019d\3\2\2\2\30\u019f"+
		"\3\2\2\2\32\u01b1\3\2\2\2\34\u01b9\3\2\2\2\36\u01c1\3\2\2\2 \u01ca\3\2"+
		"\2\2\"\u01cc\3\2\2\2$\u01ce\3\2\2\2&\u01d0\3\2\2\2(\u01d2\3\2\2\2*\u01d8"+
		"\3\2\2\2,\u01da\3\2\2\2.\u01dc\3\2\2\2\60\u01e0\3\2\2\2\62\u01e4\3\2\2"+
		"\2\64\u01e6\3\2\2\2\66\u01e8\3\2\2\28\u01ea\3\2\2\2:\u01ec\3\2\2\2<\u01f0"+
		"\3\2\2\2>\u01f2\3\2\2\2@\u01f6\3\2\2\2B\u01fc\3\2\2\2D\u020b\3\2\2\2F"+
		"\u020d\3\2\2\2H\u0216\3\2\2\2J\u021a\3\2\2\2L\u0229\3\2\2\2N\u022b\3\2"+
		"\2\2P\u022f\3\2\2\2R\u0231\3\2\2\2T\u0241\3\2\2\2V\u0250\3\2\2\2X\u025f"+
		"\3\2\2\2Z\u0261\3\2\2\2\\\u0263\3\2\2\2^\u0268\3\2\2\2`\u026a\3\2\2\2"+
		"b\u027a\3\2\2\2d\u0289\3\2\2\2f\u0296\3\2\2\2h\u029c\3\2\2\2j\u02ab\3"+
		"\2\2\2l\u02b0\3\2\2\2n\u02b3\3\2\2\2p\u02be\3\2\2\2r\u02c0\3\2\2\2t\u02c4"+
		"\3\2\2\2v\u02d2\3\2\2\2x\u02d6\3\2\2\2z\u02e4\3\2\2\2|\u02f2\3\2\2\2~"+
		"\u0300\3\2\2\2\u0080\u030e\3\2\2\2\u0082\u031c\3\2\2\2\u0084\u032c\3\2"+
		"\2\2\u0086\u032e\3\2\2\2\u0088\u033d\3\2\2\2\u008a\u0345\3\2\2\2\u008c"+
		"\u034f\3\2\2\2\u008e\u035f\3\2\2\2\u0090\u0372\3\2\2\2\u0092\u0374\3\2"+
		"\2\2\u0094\u0376\3\2\2\2\u0096\u037a\3\2\2\2\u0098\u0389\3\2\2\2\u009a"+
		"\u0398\3\2\2\2\u009c\u03a7\3\2\2\2\u009e\u03b6\3\2\2\2\u00a0\u03c0\3\2"+
		"\2\2\u00a2\u03c9\3\2\2\2\u00a4\u03cb\3\2\2\2\u00a6\u03ce\3\2\2\2\u00a8"+
		"\u03d2\3\2\2\2\u00aa\u03df\3\2\2\2\u00ac\u03e9\3\2\2\2\u00ae\u03f3\3\2"+
		"\2\2\u00b0\u03f9\3\2\2\2\u00b2\u03ff\3\2\2\2\u00b4\u0409\3\2\2\2\u00b6"+
		"\u0417\3\2\2\2\u00b8\u041d\3\2\2\2\u00ba\u0427\3\2\2\2\u00bc\u042b\3\2"+
		"\2\2\u00be\u0435\3\2\2\2\u00c0\u0437\3\2\2\2\u00c2\u0439\3\2\2\2\u00c4"+
		"\u043b\3\2\2\2\u00c6\u043d\3\2\2\2\u00c8\u0447\3\2\2\2\u00ca\u044d\3\2"+
		"\2\2\u00cc\u0452\3\2\2\2\u00ce\u045b\3\2\2\2\u00d0\u045d\3\2\2\2\u00d2"+
		"\u045f\3\2\2\2\u00d4\u0461\3\2\2\2\u00d6\u0463\3\2\2\2\u00d8\u0465\3\2"+
		"\2\2\u00da\u0467\3\2\2\2\u00dc\u0469\3\2\2\2\u00de\u0472\3\2\2\2\u00e0"+
		"\u0474\3\2\2\2\u00e2\u047a\3\2\2\2\u00e4\u0486\3\2\2\2\u00e6\u048a\3\2"+
		"\2\2\u00e8\u048e\3\2\2\2\u00ea\u0498\3\2\2\2\u00ec\u04a2\3\2\2\2\u00ee"+
		"\u04a7\3\2\2\2\u00f0\u04c5\3\2\2\2\u00f2\u04c7\3\2\2\2\u00f4\u04c9\3\2"+
		"\2\2\u00f6\u04cb\3\2\2\2\u00f8\u04cd\3\2\2\2\u00fa\u04cf\3\2\2\2\u00fc"+
		"\u04d1\3\2\2\2\u00fe\u04d7\3\2\2\2\u0100\u04d9\3\2\2\2\u0102\u04db\3\2"+
		"\2\2\u0104\u04dd\3\2\2\2\u0106\u04df\3\2\2\2\u0108\u04e6\3\2\2\2\u010a"+
		"\u04e8\3\2\2\2\u010c\u04ea\3\2\2\2\u010e\u04ec\3\2\2\2\u0110\u04ee\3\2"+
		"\2\2\u0112\u04f0\3\2\2\2\u0114\u04fa\3\2\2\2\u0116\u04fc\3\2\2\2\u0118"+
		"\u0502\3\2\2\2\u011a\u0508\3\2\2\2\u011c\u050e\3\2\2\2\u011e\u0514\3\2"+
		"\2\2\u0120\u051a\3\2\2\2\u0122\u0520\3\2\2\2\u0124\u0526\3\2\2\2\u0126"+
		"\u052c\3\2\2\2\u0128\u0536\3\2\2\2\u012a\u0538\3\2\2\2\u012c\u053a\3\2"+
		"\2\2\u012e\u053c\3\2\2\2\u0130\u053e\3\2\2\2\u0132\u0540\3\2\2\2\u0134"+
		"\u0542\3\2\2\2\u0136\u0544\3\2\2\2\u0138\u0546\3\2\2\2\u013a\u054d\3\2"+
		"\2\2\u013c\u054f\3\2\2\2\u013e\u0551\3\2\2\2\u0140\u0553\3\2\2\2\u0142"+
		"\u0143\t\2\2\2\u0143\3\3\2\2\2\u0144\u0145\t\3\2\2\u0145\5\3\2\2\2\u0146"+
		"\u0147\5\b\5\2\u0147\u0148\5\u0086D\2\u0148\u0149\5\u008aF\2\u0149\u014b"+
		"\3\2\2\2\u014a\u014c\7\2\2\3\u014b\u014a\3\2\2\2\u014b\u014c\3\2\2\2\u014c"+
		"\7\3\2\2\2\u014d\u014e\7\6\2\2\u014e\u0152\7\u009c\2\2\u014f\u0150\5\n"+
		"\6\2\u0150\u0151\7\u009c\2\2\u0151\u0153\3\2\2\2\u0152\u014f\3\2\2\2\u0152"+
		"\u0153\3\2\2\2\u0153\u0157\3\2\2\2\u0154\u0155\5\24\13\2\u0155\u0156\7"+
		"\u009c\2\2\u0156\u0158\3\2\2\2\u0157\u0154\3\2\2\2\u0157\u0158\3\2\2\2"+
		"\u0158\u015c\3\2\2\2\u0159\u015a\5h\65\2\u015a\u015b\7\u009c\2\2\u015b"+
		"\u015d\3\2\2\2\u015c\u0159\3\2\2\2\u015d\u015e\3\2\2\2\u015e\u015c\3\2"+
		"\2\2\u015e\u015f\3\2\2\2\u015f\t\3\2\2\2\u0160\u0161\7\u009d\2\2\u0161"+
		"\u0162\7\7\2\2\u0162\u016a\7\u009c\2\2\u0163\u0164\7\u009d\2\2\u0164\u0165"+
		"\7\u009d\2\2\u0165\u0166\5\f\7\2\u0166\u0167\7\u009c\2\2\u0167\u0169\3"+
		"\2\2\2\u0168\u0163\3\2\2\2\u0169\u016c\3\2\2\2\u016a\u0168\3\2\2\2\u016a"+
		"\u016b\3\2\2\2\u016b\13\3\2\2\2\u016c\u016a\3\2\2\2\u016d\u0173\5t;\2"+
		"\u016e\u0173\5\20\t\2\u016f\u0173\5\24\13\2\u0170\u0173\5\16\b\2\u0171"+
		"\u0173\5\22\n\2\u0172\u016d\3\2\2\2\u0172\u016e\3\2\2\2\u0172\u016f\3"+
		"\2\2\2\u0172\u0170\3\2\2\2\u0172\u0171\3\2\2\2\u0173\r\3\2\2\2\u0174\u0177"+
		"\7\b\2\2\u0175\u0176\7\u009e\2\2\u0176\u0178\5\2\2\2\u0177\u0175\3\2\2"+
		"\2\u0177\u0178\3\2\2\2\u0178\u017b\3\2\2\2\u0179\u017a\7\u009e\2\2\u017a"+
		"\u017c\5 \21\2\u017b\u0179\3\2\2\2\u017b\u017c\3\2\2\2\u017c\17\3\2\2"+
		"\2\u017d\u0180\7\t\2\2\u017e\u017f\7\u009e\2\2\u017f\u0181\5\2\2\2\u0180"+
		"\u017e\3\2\2\2\u0180\u0181\3\2\2\2\u0181\u0184\3\2\2\2\u0182\u0183\7\u009e"+
		"\2\2\u0183\u0185\5 \21\2\u0184\u0182\3\2\2\2\u0184\u0185\3\2\2\2\u0185"+
		"\21\3\2\2\2\u0186\u0187\t\4\2\2\u0187\23\3\2\2\2\u0188\u0189\7\u009d\2"+
		"\2\u0189\u018a\7\r\2\2\u018a\u0192\7\u009c\2\2\u018b\u018c\7\u009d\2\2"+
		"\u018c\u018d\7\u009d\2\2\u018d\u018e\5\26\f\2\u018e\u018f\7\u009c\2\2"+
		"\u018f\u0191\3\2\2\2\u0190\u018b\3\2\2\2\u0191\u0194\3\2\2\2\u0192\u0190"+
		"\3\2\2\2\u0192\u0193\3\2\2\2\u0193\25\3\2\2\2\u0194\u0192\3\2\2\2\u0195"+
		"\u019e\5\36\20\2\u0196\u019e\5B\"\2\u0197\u019e\5J&\2\u0198\u019e\5V,"+
		"\2\u0199\u019e\5d\63\2\u019a\u019e\5\30\r\2\u019b\u019e\5\32\16\2\u019c"+
		"\u019e\5\34\17\2\u019d\u0195\3\2\2\2\u019d\u0196\3\2\2\2\u019d\u0197\3"+
		"\2\2\2\u019d\u0198\3\2\2\2\u019d\u0199\3\2\2\2\u019d\u019a\3\2\2\2\u019d"+
		"\u019b\3\2\2\2\u019d\u019c\3\2\2\2\u019e\27\3\2\2\2\u019f\u01a0\7\16\2"+
		"\2\u01a0\u01a1\7\u009e\2\2\u01a1\u01ac\7\17\2\2\u01a2\u01a3\7\u009b\2"+
		"\2\u01a3\u01a4\7\u009e\2\2\u01a4\u01a5\7\5\2\2\u01a5\u01a6\7\u009e\2\2"+
		"\u01a6\u01a8\5\u0128\u0095\2\u01a7\u01a9\7\u009e\2\2\u01a8\u01a7\3\2\2"+
		"\2\u01a8\u01a9\3\2\2\2\u01a9\u01ab\3\2\2\2\u01aa\u01a2\3\2\2\2\u01ab\u01ae"+
		"\3\2\2\2\u01ac\u01aa\3\2\2\2\u01ac\u01ad\3\2\2\2\u01ad\u01af\3\2\2\2\u01ae"+
		"\u01ac\3\2\2\2\u01af\u01b0\7\20\2\2\u01b0\31\3\2\2\2\u01b1\u01b2\7\21"+
		"\2\2\u01b2\u01b3\7\u009e\2\2\u01b3\u01b4\7\u009b\2\2\u01b4\u01b5\7\u009e"+
		"\2\2\u01b5\u01b6\7\5\2\2\u01b6\u01b7\7\u009e\2\2\u01b7\u01b8\5\u0114\u008b"+
		"\2\u01b8\33\3\2\2\2\u01b9\u01ba\7\22\2\2\u01ba\u01bb\7\u009e\2\2\u01bb"+
		"\u01bc\7\u009b\2\2\u01bc\u01bd\7\u009e\2\2\u01bd\u01be\7\5\2\2\u01be\u01bf"+
		"\7\u009e\2\2\u01bf\u01c0\5^\60\2\u01c0\35\3\2\2\2\u01c1\u01c2\7\23\2\2"+
		"\u01c2\u01c3\7\u009e\2\2\u01c3\u01c4\5\62\32\2\u01c4\u01c5\7\u009e\2\2"+
		"\u01c5\u01c6\5<\37\2\u01c6\37\3\2\2\2\u01c7\u01cb\5(\25\2\u01c8\u01cb"+
		"\5.\30\2\u01c9\u01cb\5\60\31\2\u01ca\u01c7\3\2\2\2\u01ca\u01c8\3\2\2\2"+
		"\u01ca\u01c9\3\2\2\2\u01cb!\3\2\2\2\u01cc\u01cd\7\u009b\2\2\u01cd#\3\2"+
		"\2\2\u01ce\u01cf\7\u009b\2\2\u01cf%\3\2\2\2\u01d0\u01d1\7\u009b\2\2\u01d1"+
		"\'\3\2\2\2\u01d2\u01d3\5\"\22\2\u01d3\u01d4\7\24\2\2\u01d4\u01d5\5$\23"+
		"\2\u01d5\u01d6\7\24\2\2\u01d6\u01d7\5&\24\2\u01d7)\3\2\2\2\u01d8\u01d9"+
		"\7\u009b\2\2\u01d9+\3\2\2\2\u01da\u01db\7\u009b\2\2\u01db-\3\2\2\2\u01dc"+
		"\u01dd\5*\26\2\u01dd\u01de\7\24\2\2\u01de\u01df\5,\27\2\u01df/\3\2\2\2"+
		"\u01e0\u01e1\7\u009b\2\2\u01e1\61\3\2\2\2\u01e2\u01e5\5\64\33\2\u01e3"+
		"\u01e5\5\66\34\2\u01e4\u01e2\3\2\2\2\u01e4\u01e3\3\2\2\2\u01e5\63\3\2"+
		"\2\2\u01e6\u01e7\t\5\2\2\u01e7\65\3\2\2\2\u01e8\u01e9\t\6\2\2\u01e9\67"+
		"\3\2\2\2\u01ea\u01eb\7\27\2\2\u01eb9\3\2\2\2\u01ec\u01ed\7\30\2\2\u01ed"+
		";\3\2\2\2\u01ee\u01f1\58\35\2\u01ef\u01f1\5:\36\2\u01f0\u01ee\3\2\2\2"+
		"\u01f0\u01ef\3\2\2\2\u01f1=\3\2\2\2\u01f2\u01f3\5 \21\2\u01f3\u01f4\7"+
		"\31\2\2\u01f4\u01f5\5 \21\2\u01f5?\3\2\2\2\u01f6\u01f7\5 \21\2\u01f7\u01f8"+
		"\7\u00a8\2\2\u01f8\u01f9\5 \21\2\u01f9\u01fa\7\u00a8\2\2\u01fa\u01fb\5"+
		" \21\2\u01fbA\3\2\2\2\u01fc\u01fd\7\32\2\2\u01fd\u0206\7\u009c\2\2\u01fe"+
		"\u01ff\7\u009d\2\2\u01ff\u0200\7\u009d\2\2\u0200\u0201\7\u009d\2\2\u0201"+
		"\u0202\5D#\2\u0202\u0203\7\u009c\2\2\u0203\u0205\3\2\2\2\u0204\u01fe\3"+
		"\2\2\2\u0205\u0208\3\2\2\2\u0206\u0204\3\2\2\2\u0206\u0207\3\2\2\2\u0207"+
		"C\3\2\2\2\u0208\u0206\3\2\2\2\u0209\u020c\5F$\2\u020a\u020c\5H%\2\u020b"+
		"\u0209\3\2\2\2\u020b\u020a\3\2\2\2\u020cE\3\2\2\2\u020d\u0210\5\u0128"+
		"\u0095\2\u020e\u020f\7\u009e\2\2\u020f\u0211\5\u0128\u0095\2\u0210\u020e"+
		"\3\2\2\2\u0211\u0212\3\2\2\2\u0212\u0210\3\2\2\2\u0212\u0213\3\2\2\2\u0213"+
		"G\3\2\2\2\u0214\u0215\7\u009e\2\2\u0215\u0217\5\u0128\u0095\2\u0216\u0214"+
		"\3\2\2\2\u0217\u0218\3\2\2\2\u0218\u0216\3\2\2\2\u0218\u0219\3\2\2\2\u0219"+
		"I\3\2\2\2\u021a\u021b\7\33\2\2\u021b\u0224\7\u009c\2\2\u021c\u021d\7\u009d"+
		"\2\2\u021d\u021e\7\u009d\2\2\u021e\u021f\7\u009d\2\2\u021f\u0220\5L\'"+
		"\2\u0220\u0221\7\u009c\2\2\u0221\u0223\3\2\2\2\u0222\u021c\3\2\2\2\u0223"+
		"\u0226\3\2\2\2\u0224\u0222\3\2\2\2\u0224\u0225\3\2\2\2\u0225K\3\2\2\2"+
		"\u0226\u0224\3\2\2\2\u0227\u022a\5R*\2\u0228\u022a\5T+\2\u0229\u0227\3"+
		"\2\2\2\u0229\u0228\3\2\2\2\u022aM\3\2\2\2\u022b\u022c\7\34\2\2\u022cO"+
		"\3\2\2\2\u022d\u0230\7\u009b\2\2\u022e\u0230\5N(\2\u022f\u022d\3\2\2\2"+
		"\u022f\u022e\3\2\2\2\u0230Q\3\2\2\2\u0231\u0232\7\u009e\2\2\u0232\u023d"+
		"\7\u009e\2\2\u0233\u0235\5P)\2\u0234\u0236\7\u009e\2\2\u0235\u0234\3\2"+
		"\2\2\u0235\u0236\3\2\2\2\u0236\u0238\3\2\2\2\u0237\u0239\7\u009e\2\2\u0238"+
		"\u0237\3\2\2\2\u0238\u0239\3\2\2\2\u0239\u023b\3\2\2\2\u023a\u023c\7\u009e"+
		"\2\2\u023b\u023a\3\2\2\2\u023b\u023c\3\2\2\2\u023c\u023e\3\2\2\2\u023d"+
		"\u0233\3\2\2\2\u023e\u023f\3\2\2\2\u023f\u023d\3\2\2\2\u023f\u0240\3\2"+
		"\2\2\u0240S\3\2\2\2\u0241\u024c\5P)\2\u0242\u0244\7\u009e\2\2\u0243\u0242"+
		"\3\2\2\2\u0243\u0244\3\2\2\2\u0244\u0246\3\2\2\2\u0245\u0247\7\u009e\2"+
		"\2\u0246\u0245\3\2\2\2\u0246\u0247\3\2\2\2\u0247\u0249\3\2\2\2\u0248\u024a"+
		"\7\u009e\2\2\u0249\u0248\3\2\2\2\u0249\u024a\3\2\2\2\u024a\u024b\3\2\2"+
		"\2\u024b\u024d\5P)\2\u024c\u0243\3\2\2\2\u024d\u024e\3\2\2\2\u024e\u024c"+
		"\3\2\2\2\u024e\u024f\3\2\2\2\u024fU\3\2\2\2\u0250\u0251\7\35\2\2\u0251"+
		"\u025a\7\u009c\2\2\u0252\u0253\7\u009d\2\2\u0253\u0254\7\u009d\2\2\u0254"+
		"\u0255\7\u009d\2\2\u0255\u0256\5X-\2\u0256\u0257\7\u009c\2\2\u0257\u0259"+
		"\3\2\2\2\u0258\u0252\3\2\2\2\u0259\u025c\3\2\2\2\u025a\u0258\3\2\2\2\u025a"+
		"\u025b\3\2\2\2\u025bW\3\2\2\2\u025c\u025a\3\2\2\2\u025d\u0260\5`\61\2"+
		"\u025e\u0260\5b\62\2\u025f\u025d\3\2\2\2\u025f\u025e\3\2\2\2\u0260Y\3"+
		"\2\2\2\u0261\u0262\7\34\2\2\u0262[\3\2\2\2\u0263\u0264\7\u00a6\2\2\u0264"+
		"]\3\2\2\2\u0265\u0269\7\u009b\2\2\u0266\u0269\5Z.\2\u0267\u0269\5\\/\2"+
		"\u0268\u0265\3\2\2\2\u0268\u0266\3\2\2\2\u0268\u0267\3\2\2\2\u0269_\3"+
		"\2\2\2\u026a\u026b\7\u009e\2\2\u026b\u0276\7\u009e\2\2\u026c\u026e\5^"+
		"\60\2\u026d\u026f\7\u009e\2\2\u026e\u026d\3\2\2\2\u026e\u026f\3\2\2\2"+
		"\u026f\u0271\3\2\2\2\u0270\u0272\7\u009e\2\2\u0271\u0270\3\2\2\2\u0271"+
		"\u0272\3\2\2\2\u0272\u0274\3\2\2\2\u0273\u0275\7\u009e\2\2\u0274\u0273"+
		"\3\2\2\2\u0274\u0275\3\2\2\2\u0275\u0277\3\2\2\2\u0276\u026c\3\2\2\2\u0277"+
		"\u0278\3\2\2\2\u0278\u0276\3\2\2\2\u0278\u0279\3\2\2\2\u0279a\3\2\2\2"+
		"\u027a\u0285\5^\60\2\u027b\u027d\7\u009e\2\2\u027c\u027b\3\2\2\2\u027c"+
		"\u027d\3\2\2\2\u027d\u027f\3\2\2\2\u027e\u0280\7\u009e\2\2\u027f\u027e"+
		"\3\2\2\2\u027f\u0280\3\2\2\2\u0280\u0282\3\2\2\2\u0281\u0283\7\u009e\2"+
		"\2\u0282\u0281\3\2\2\2\u0282\u0283\3\2\2\2\u0283\u0284\3\2\2\2\u0284\u0286"+
		"\5^\60\2\u0285\u027c\3\2\2\2\u0286\u0287\3\2\2\2\u0287\u0285\3\2\2\2\u0287"+
		"\u0288\3\2\2\2\u0288c\3\2\2\2\u0289\u028a\7\36\2\2\u028a\u0293\7\u009c"+
		"\2\2\u028b\u028c\7\u009d\2\2\u028c\u028d\7\u009d\2\2\u028d\u028e\7\u009d"+
		"\2\2\u028e\u028f\5f\64\2\u028f\u0290\7\u009c\2\2\u0290\u0292\3\2\2\2\u0291"+
		"\u028b\3\2\2\2\u0292\u0295\3\2\2\2\u0293\u0291\3\2\2\2\u0293\u0294\3\2"+
		"\2\2\u0294e\3\2\2\2\u0295\u0293\3\2\2\2\u0296\u0297\5\u0114\u008b\2\u0297"+
		"\u0298\7\u009e\2\2\u0298\u0299\5\2\2\2\u0299\u029a\7\u009e\2\2\u029a\u029b"+
		"\5> \2\u029bg\3\2\2\2\u029c\u029d\7\u009d\2\2\u029d\u029e\5j\66\2\u029e"+
		"\u02a6\7\u009c\2\2\u029f\u02a0\7\u009d\2\2\u02a0\u02a1\7\u009d\2\2\u02a1"+
		"\u02a2\5p9\2\u02a2\u02a3\7\u009c\2\2\u02a3\u02a5\3\2\2\2\u02a4\u029f\3"+
		"\2\2\2\u02a5\u02a8\3\2\2\2\u02a6\u02a4\3\2\2\2\u02a6\u02a7\3\2\2\2\u02a7"+
		"i\3\2\2\2\u02a8\u02a6\3\2\2\2\u02a9\u02ac\5l\67\2\u02aa\u02ac\5n8\2\u02ab"+
		"\u02a9\3\2\2\2\u02ab\u02aa\3\2\2\2\u02ab\u02ac\3\2\2\2\u02ac\u02ad\3\2"+
		"\2\2\u02ad\u02ae\t\7\2\2\u02ae\u02af\7\u009b\2\2\u02afk\3\2\2\2\u02b0"+
		"\u02b1\t\b\2\2\u02b1\u02b2\7#\2\2\u02b2m\3\2\2\2\u02b3\u02b4\t\t\2\2\u02b4"+
		"\u02b5\7#\2\2\u02b5o\3\2\2\2\u02b6\u02bf\5r:\2\u02b7\u02bf\5t;\2\u02b8"+
		"\u02bf\5x=\2\u02b9\u02bf\5z>\2\u02ba\u02bf\5|?\2\u02bb\u02bf\5~@\2\u02bc"+
		"\u02bf\5\u0080A\2\u02bd\u02bf\5\u0082B\2\u02be\u02b6\3\2\2\2\u02be\u02b7"+
		"\3\2\2\2\u02be\u02b8\3\2\2\2\u02be\u02b9\3\2\2\2\u02be\u02ba\3\2\2\2\u02be"+
		"\u02bb\3\2\2\2\u02be\u02bc\3\2\2\2\u02be\u02bd\3\2\2\2\u02bfq\3\2\2\2"+
		"\u02c0\u02c1\7&\2\2\u02c1\u02c2\7\u009e\2\2\u02c2\u02c3\5\u00eex\2\u02c3"+
		"s\3\2\2\2\u02c4\u02c5\7\'\2\2\u02c5\u02c6\7\u009e\2\2\u02c6\u02cd\7\17"+
		"\2\2\u02c7\u02c9\5v<\2\u02c8\u02ca\7\u009e\2\2\u02c9\u02c8\3\2\2\2\u02c9"+
		"\u02ca\3\2\2\2\u02ca\u02cc\3\2\2\2\u02cb\u02c7\3\2\2\2\u02cc\u02cf\3\2"+
		"\2\2\u02cd\u02cb\3\2\2\2\u02cd\u02ce\3\2\2\2\u02ce\u02d0\3\2\2\2\u02cf"+
		"\u02cd\3\2\2\2\u02d0\u02d1\7\20\2\2\u02d1u\3\2\2\2\u02d2\u02d3\5\u00fe"+
		"\u0080\2\u02d3\u02d4\5\4\3\2\u02d4\u02d5\7\u009b\2\2\u02d5w\3\2\2\2\u02d6"+
		"\u02d7\7(\2\2\u02d7\u02d8\7\u009e\2\2\u02d8\u02df\7\17\2\2\u02d9\u02db"+
		"\5\u0108\u0085\2\u02da\u02dc\7\u009e\2\2\u02db\u02da\3\2\2\2\u02db\u02dc"+
		"\3\2\2\2\u02dc\u02de\3\2\2\2\u02dd\u02d9\3\2\2\2\u02de\u02e1\3\2\2\2\u02df"+
		"\u02dd\3\2\2\2\u02df\u02e0\3\2\2\2\u02e0\u02e2\3\2\2\2\u02e1\u02df\3\2"+
		"\2\2\u02e2\u02e3\7\20\2\2\u02e3y\3\2\2\2\u02e4\u02e5\7\36\2\2\u02e5\u02e6"+
		"\7\u009e\2\2\u02e6\u02ed\7\17\2\2\u02e7\u02e9\5\u0114\u008b\2\u02e8\u02ea"+
		"\7\u009e\2\2\u02e9\u02e8\3\2\2\2\u02e9\u02ea\3\2\2\2\u02ea\u02ec\3\2\2"+
		"\2\u02eb\u02e7\3\2\2\2\u02ec\u02ef\3\2\2\2\u02ed\u02eb\3\2\2\2\u02ed\u02ee"+
		"\3\2\2\2\u02ee\u02f0\3\2\2\2\u02ef\u02ed\3\2\2\2\u02f0\u02f1\7\20\2\2"+
		"\u02f1{\3\2\2\2\u02f2\u02f3\7)\2\2\u02f3\u02f4\7\u009e\2\2\u02f4\u02fb"+
		"\7\17\2\2\u02f5\u02f7\5\u013a\u009e\2\u02f6\u02f8\7\u009e\2\2\u02f7\u02f6"+
		"\3\2\2\2\u02f7\u02f8\3\2\2\2\u02f8\u02fa\3\2\2\2\u02f9\u02f5\3\2\2\2\u02fa"+
		"\u02fd\3\2\2\2\u02fb\u02f9\3\2\2\2\u02fb\u02fc\3\2\2\2\u02fc\u02fe\3\2"+
		"\2\2\u02fd\u02fb\3\2\2\2\u02fe\u02ff\7\20\2\2\u02ff}\3\2\2\2\u0300\u0301"+
		"\7*\2\2\u0301\u0302\7\u009e\2\2\u0302\u0309\7\17\2\2\u0303\u0305\5@!\2"+
		"\u0304\u0306\7\u009e\2\2\u0305\u0304\3\2\2\2\u0305\u0306\3\2\2\2\u0306"+
		"\u0308\3\2\2\2\u0307\u0303\3\2\2\2\u0308\u030b\3\2\2\2\u0309\u0307\3\2"+
		"\2\2\u0309\u030a\3\2\2\2\u030a\u030c\3\2\2\2\u030b\u0309\3\2\2\2\u030c"+
		"\u030d\7\20\2\2\u030d\177\3\2\2\2\u030e\u030f\7+\2\2\u030f\u0310\7\u009e"+
		"\2\2\u0310\u0317\7\17\2\2\u0311\u0313\5@!\2\u0312\u0314\7\u009e\2\2\u0313"+
		"\u0312\3\2\2\2\u0313\u0314\3\2\2\2\u0314\u0316\3\2\2\2\u0315\u0311\3\2"+
		"\2\2\u0316\u0319\3\2\2\2\u0317\u0315\3\2\2\2\u0317\u0318\3\2\2\2\u0318"+
		"\u031a\3\2\2\2\u0319\u0317\3\2\2\2\u031a\u031b\7\20\2\2\u031b\u0081\3"+
		"\2\2\2\u031c\u031d\7,\2\2\u031d\u031e\7\u009e\2\2\u031e\u0325\7\17\2\2"+
		"\u031f\u0321\5> \2\u0320\u0322\7\u009e\2\2\u0321\u0320\3\2\2\2\u0321\u0322"+
		"\3\2\2\2\u0322\u0324\3\2\2\2\u0323\u031f\3\2\2\2\u0324\u0327\3\2\2\2\u0325"+
		"\u0323\3\2\2\2\u0325\u0326\3\2\2\2\u0326\u0328\3\2\2\2\u0327\u0325\3\2"+
		"\2\2\u0328\u0329\7\20\2\2\u0329\u0083\3\2\2\2\u032a\u032d\5\u0088E\2\u032b"+
		"\u032d\5\u00caf\2\u032c\u032a\3\2\2\2\u032c\u032b\3\2\2\2\u032d\u0085"+
		"\3\2\2\2\u032e\u032f\7-\2\2\u032f\u0336\7\u009c\2\2\u0330\u0331\7\u009d"+
		"\2\2\u0331\u0332\5\u0084C\2\u0332\u0333\7\u009c\2\2\u0333\u0335\3\2\2"+
		"\2\u0334\u0330\3\2\2\2\u0335\u0338\3\2\2\2\u0336\u0334\3\2\2\2\u0336\u0337"+
		"\3\2\2\2\u0337\u0087\3\2\2\2\u0338\u0336\3\2\2\2\u0339\u033e\5\u0096L"+
		"\2\u033a\u033e\5\u0098M\2\u033b\u033e\5\u009aN\2\u033c\u033e\5\u009cO"+
		"\2\u033d\u0339\3\2\2\2\u033d\u033a\3\2\2\2\u033d\u033b\3\2\2\2\u033d\u033c"+
		"\3\2\2\2\u033e\u0343\3\2\2\2\u033f\u0340\7\u009e\2\2\u0340\u0341\7.\2"+
		"\2\u0341\u0342\7\u009e\2\2\u0342\u0344\5\u00eex\2\u0343\u033f\3\2\2\2"+
		"\u0343\u0344\3\2\2\2\u0344\u0089\3\2\2\2\u0345\u0346\7/\2\2\u0346\u034b"+
		"\7\u009c\2\2\u0347\u0348\7\u009d\2\2\u0348\u0349\5\u008cG\2\u0349\u034a"+
		"\7\u009c\2\2\u034a\u034c\3\2\2\2\u034b\u0347\3\2\2\2\u034c\u034d\3\2\2"+
		"\2\u034d\u034b\3\2\2\2\u034d\u034e\3\2\2\2\u034e\u008b\3\2\2\2\u034f\u0350"+
		"\7\60\2\2\u0350\u0351\7\u009e\2\2\u0351\u0352\7\u009b\2\2\u0352\u035a"+
		"\7\u009c\2\2\u0353\u0354\7\u009d\2\2\u0354\u0355\7\u009d\2\2\u0355\u0356"+
		"\5\u008eH\2\u0356\u0357\7\u009c\2\2\u0357\u0359\3\2\2\2\u0358\u0353\3"+
		"\2\2\2\u0359\u035c\3\2\2\2\u035a\u0358\3\2\2\2\u035a\u035b\3\2\2\2\u035b"+
		"\u008d\3\2\2\2\u035c\u035a\3\2\2\2\u035d\u0360\5\u0090I\2\u035e\u0360"+
		"\5\u00caf\2\u035f\u035d\3\2\2\2\u035f\u035e\3\2\2\2\u0360\u008f\3\2\2"+
		"\2\u0361\u0373\5\u009aN\2\u0362\u0373\5\u009cO\2\u0363\u0373\5\u0098M"+
		"\2\u0364\u0373\5\u0096L\2\u0365\u0373\5\u0094K\2\u0366\u0373\5\u009eP"+
		"\2\u0367\u0373\5\u00a0Q\2\u0368\u0373\5\u00aaV\2\u0369\u0373\5\u00acW"+
		"\2\u036a\u0373\5\u00aeX\2\u036b\u0373\5\u00b0Y\2\u036c\u0373\5\u00b2Z"+
		"\2\u036d\u0373\5\u00b4[\2\u036e\u0373\5\u00b6\\\2\u036f\u0373\5\u00b8"+
		"]\2\u0370\u0373\5\u00ba^\2\u0371\u0373\5\u00bc_\2\u0372\u0361\3\2\2\2"+
		"\u0372\u0362\3\2\2\2\u0372\u0363\3\2\2\2\u0372\u0364\3\2\2\2\u0372\u0365"+
		"\3\2\2\2\u0372\u0366\3\2\2\2\u0372\u0367\3\2\2\2\u0372\u0368\3\2\2\2\u0372"+
		"\u0369\3\2\2\2\u0372\u036a\3\2\2\2\u0372\u036b\3\2\2\2\u0372\u036c\3\2"+
		"\2\2\u0372\u036d\3\2\2\2\u0372\u036e\3\2\2\2\u0372\u036f\3\2\2\2\u0372"+
		"\u0370\3\2\2\2\u0372\u0371\3\2\2\2\u0373\u0091\3\2\2\2\u0374\u0375\t\n"+
		"\2\2\u0375\u0093\3\2\2\2\u0376\u0377\5j\66\2\u0377\u0378\7\u009e\2\2\u0378"+
		"\u0379\7\63\2\2\u0379\u0095\3\2\2\2\u037a\u037b\5j\66\2\u037b\u037c\7"+
		"\u009e\2\2\u037c\u037e\5\u0092J\2\u037d\u037f\7\u009e\2\2\u037e\u037d"+
		"\3\2\2\2\u037e\u037f\3\2\2\2\u037f\u0380\3\2\2\2\u0380\u0381\5\u0102\u0082"+
		"\2\u0381\u0385\7\u009e\2\2\u0382\u0383\5\2\2\2\u0383\u0384\7\u009e\2\2"+
		"\u0384\u0386\3\2\2\2\u0385\u0382\3\2\2\2\u0385\u0386\3\2\2\2\u0386\u0387"+
		"\3\2\2\2\u0387\u0388\5@!\2\u0388\u0097\3\2\2\2\u0389\u038a\5j\66\2\u038a"+
		"\u038b\7\u009e\2\2\u038b\u038d\5\u0092J\2\u038c\u038e\7\u009e\2\2\u038d"+
		"\u038c\3\2\2\2\u038d\u038e\3\2\2\2\u038e\u038f\3\2\2\2\u038f\u0390\5\u0104"+
		"\u0083\2\u0390\u0394\7\u009e\2\2\u0391\u0392\5\2\2\2\u0392\u0393\7\u009e"+
		"\2\2\u0393\u0395\3\2\2\2\u0394\u0391\3\2\2\2\u0394\u0395\3\2\2\2\u0395"+
		"\u0396\3\2\2\2\u0396\u0397\5> \2\u0397\u0099\3\2\2\2\u0398\u0399\5j\66"+
		"\2\u0399\u039a\7\u009e\2\2\u039a\u039c\5\u0092J\2\u039b\u039d\7\u009e"+
		"\2\2\u039c\u039b\3\2\2\2\u039c\u039d\3\2\2\2\u039d\u039e\3\2\2\2\u039e"+
		"\u039f\5\u0106\u0084\2\u039f\u03a3\7\u009e\2\2\u03a0\u03a1\5\2\2\2\u03a1"+
		"\u03a2\7\u009e\2\2\u03a2\u03a4\3\2\2\2\u03a3\u03a0\3\2\2\2\u03a3\u03a4"+
		"\3\2\2\2\u03a4\u03a5\3\2\2\2\u03a5\u03a6\5> \2\u03a6\u009b\3\2\2\2\u03a7"+
		"\u03a8\5j\66\2\u03a8\u03a9\7\u009e\2\2\u03a9\u03ab\5\u0092J\2\u03aa\u03ac"+
		"\7\u009e\2\2\u03ab\u03aa\3\2\2\2\u03ab\u03ac\3\2\2\2\u03ac\u03ad\3\2\2"+
		"\2\u03ad\u03ae\5\u0100\u0081\2\u03ae\u03b2\7\u009e\2\2\u03af\u03b0\5\2"+
		"\2\2\u03b0\u03b1\7\u009e\2\2\u03b1\u03b3\3\2\2\2\u03b2\u03af\3\2\2\2\u03b2"+
		"\u03b3\3\2\2\2\u03b3\u03b4\3\2\2\2\u03b4\u03b5\5@!\2\u03b5\u009d\3\2\2"+
		"\2\u03b6\u03b7\5j\66\2\u03b7\u03b8\7\u009e\2\2\u03b8\u03b9\7\64\2\2\u03b9"+
		"\u03ba\7\u009e\2\2\u03ba\u03bb\5\16\b\2\u03bb\u03bc\7\u009e\2\2\u03bc"+
		"\u03bd\7\65\2\2\u03bd\u03be\7\u009e\2\2\u03be\u03bf\5 \21\2\u03bf\u009f"+
		"\3\2\2\2\u03c0\u03c1\5j\66\2\u03c1\u03c2\7\u009e\2\2\u03c2\u03c3\5\u00a4"+
		"S\2\u03c3\u03c4\7\u009e\2\2\u03c4\u03c5\5\u00a8U\2\u03c5\u00a1\3\2\2\2"+
		"\u03c6\u03ca\7\u00a0\2\2\u03c7\u03c8\7\66\2\2\u03c8\u03ca\7\u009e\2\2"+
		"\u03c9\u03c6\3\2\2\2\u03c9\u03c7\3\2\2\2\u03ca\u00a3\3\2\2\2\u03cb\u03cc"+
		"\5\u00a2R\2\u03cc\u03cd\7\u009b\2\2\u03cd\u00a5\3\2\2\2\u03ce\u03cf\5"+
		"j\66\2\u03cf\u03d0\7\u009e\2\2\u03d0\u03d1\5\u00eex\2\u03d1\u00a7\3\2"+
		"\2\2\u03d2\u03db\7\17\2\2\u03d3\u03d8\5\u00a6T\2\u03d4\u03d5\7\24\2\2"+
		"\u03d5\u03d7\5\u00a6T\2\u03d6\u03d4\3\2\2\2\u03d7\u03da\3\2\2\2\u03d8"+
		"\u03d6\3\2\2\2\u03d8\u03d9\3\2\2\2\u03d9\u03dc\3\2\2\2\u03da\u03d8\3\2"+
		"\2\2\u03db\u03d3\3\2\2\2\u03db\u03dc\3\2\2\2\u03dc\u03dd\3\2\2\2\u03dd"+
		"\u03de\7\20\2\2\u03de\u00a9\3\2\2\2\u03df\u03e0\5j\66\2\u03e0\u03e1\7"+
		"\u009e\2\2\u03e1\u03e2\7\67\2\2\u03e2\u03e3\7\u009e\2\2\u03e3\u03e4\5"+
		"> \2\u03e4\u03e5\7\u009e\2\2\u03e5\u03e6\7\65\2\2\u03e6\u03e7\7\u009e"+
		"\2\2\u03e7\u03e8\5> \2\u03e8\u00ab\3\2\2\2\u03e9\u03ea\5j\66\2\u03ea\u03eb"+
		"\7\u009e\2\2\u03eb\u03ec\78\2\2\u03ec\u03ed\7\u009e\2\2\u03ed\u03ee\5"+
		"\u00eex\2\u03ee\u03ef\7\u009e\2\2\u03ef\u03f0\79\2\2\u03f0\u03f1\7\u009e"+
		"\2\2\u03f1\u03f2\5\u00eex\2\u03f2\u00ad\3\2\2\2\u03f3\u03f4\5j\66\2\u03f4"+
		"\u03f5\7\u009e\2\2\u03f5\u03f6\7:\2\2\u03f6\u03f7\7\u009e\2\2\u03f7\u03f8"+
		"\5j\66\2\u03f8\u00af\3\2\2\2\u03f9\u03fa\5j\66\2\u03fa\u03fb\7\u009e\2"+
		"\2\u03fb\u03fc\7;\2\2\u03fc\u03fd\7\u009e\2\2\u03fd\u03fe\5j\66\2\u03fe"+
		"\u00b1\3\2\2\2\u03ff\u0400\5j\66\2\u0400\u0401\7\u009e\2\2\u0401\u0402"+
		"\7<\2\2\u0402\u0403\7\u009e\2\2\u0403\u0404\5\u00eex\2\u0404\u0405\7\u009e"+
		"\2\2\u0405\u0406\79\2\2\u0406\u0407\7\u009e\2\2\u0407\u0408\5\u00eex\2"+
		"\u0408\u00b3\3\2\2\2\u0409\u040a\5j\66\2\u040a\u040b\7\u009e\2\2\u040b"+
		"\u040c\7=\2\2\u040c\u040d\7\u009e\2\2\u040d\u040e\5\u00eex\2\u040e\u040f"+
		"\7\u009e\2\2\u040f\u0410\79\2\2\u0410\u0411\7\u009e\2\2\u0411\u0412\5"+
		"\u00eex\2\u0412\u0413\7\u009e\2\2\u0413\u0414\7>\2\2\u0414\u0415\7\u009e"+
		"\2\2\u0415\u0416\5j\66\2\u0416\u00b5\3\2\2\2\u0417\u0418\5j\66\2\u0418"+
		"\u0419\7\u009e\2\2\u0419\u041a\7?\2\2\u041a\u041b\7\u009e\2\2\u041b\u041c"+
		"\5\u00eex\2\u041c\u00b7\3\2\2\2\u041d\u041e\5j\66\2\u041e\u041f\7\u009e"+
		"\2\2\u041f\u0420\7@\2\2\u0420\u0421\7\u009e\2\2\u0421\u0422\5j\66\2\u0422"+
		"\u0423\7\u009e\2\2\u0423\u0424\7A\2\2\u0424\u0425\7\u009e\2\2\u0425\u0426"+
		"\5\u00f0y\2\u0426\u00b9\3\2\2\2\u0427\u0428\5j\66\2\u0428\u0429\7\u009e"+
		"\2\2\u0429\u042a\7B\2\2\u042a\u00bb\3\2\2\2\u042b\u042c\5j\66\2\u042c"+
		"\u042d\7\u009e\2\2\u042d\u042e\7C\2\2\u042e\u042f\5\u00be`\2\u042f\u00bd"+
		"\3\2\2\2\u0430\u0436\5\u00c0a\2\u0431\u0436\5\u00c2b\2\u0432\u0436\5\u00c4"+
		"c\2\u0433\u0436\5\u00c6d\2\u0434\u0436\5\u00c8e\2\u0435\u0430\3\2\2\2"+
		"\u0435\u0431\3\2\2\2\u0435\u0432\3\2\2\2\u0435\u0433\3\2\2\2\u0435\u0434"+
		"\3\2\2\2\u0436\u00bf\3\2\2\2\u0437\u0438\5\u010a\u0086\2\u0438\u00c1\3"+
		"\2\2\2\u0439\u043a\5\u0110\u0089\2\u043a\u00c3\3\2\2\2\u043b\u043c\5\u010e"+
		"\u0088\2\u043c\u00c5\3\2\2\2\u043d\u043e\5\u010c\u0087\2\u043e\u043f\7"+
		"\u009e\2\2\u043f\u0440\7D\2\2\u0440\u0441\7\u009e\2\2\u0441\u0442\5\u00f0"+
		"y\2\u0442\u0443\7\u009e\2\2\u0443\u0444\7.\2\2\u0444\u0445\7\u009e\2\2"+
		"\u0445\u0446\5\u00eex\2\u0446\u00c7\3\2\2\2\u0447\u0448\5\u0112\u008a"+
		"\2\u0448\u0449\7\u009e\2\2\u0449\u044a\7.\2\2\u044a\u044b\5\u00f0y\2\u044b"+
		"\u044c\5\u00f0y\2\u044c\u00c9\3\2\2\2\u044d\u044e\7\u009d\2\2\u044e\u044f"+
		"\5\u00ccg\2\u044f\u0450\7\u009e\2\2\u0450\u0451\5\u00dep\2\u0451\u00cb"+
		"\3\2\2\2\u0452\u0453\t\13\2\2\u0453\u00cd\3\2\2\2\u0454\u045c\5\u00d0"+
		"i\2\u0455\u045c\5\u00d2j\2\u0456\u045c\5\u00d4k\2\u0457\u045c\5\u00d6"+
		"l\2\u0458\u045c\5\u00d8m\2\u0459\u045c\5\u00dan\2\u045a\u045c\5\u00dc"+
		"o\2\u045b\u0454\3\2\2\2\u045b\u0455\3\2\2\2\u045b\u0456\3\2\2\2\u045b"+
		"\u0457\3\2\2\2\u045b\u0458\3\2\2\2\u045b\u0459\3\2\2\2\u045b\u045a\3\2"+
		"\2\2\u045c\u00cf\3\2\2\2\u045d\u045e\7G\2\2\u045e\u00d1\3\2\2\2\u045f"+
		"\u0460\t\f\2\2\u0460\u00d3\3\2\2\2\u0461\u0462\t\r\2\2\u0462\u00d5\3\2"+
		"\2\2\u0463\u0464\t\16\2\2\u0464\u00d7\3\2\2\2\u0465\u0466\t\17\2\2\u0466"+
		"\u00d9\3\2\2\2\u0467\u0468\t\20\2\2\u0468\u00db\3\2\2\2\u0469\u046a\t"+
		"\21\2\2\u046a\u00dd\3\2\2\2\u046b\u0473\5\u00e0q\2\u046c\u0473\5\u00e2"+
		"r\2\u046d\u0473\5\u00e6t\2\u046e\u0473\5\u00e4s\2\u046f\u0473\5\u00e8"+
		"u\2\u0470\u0473\5\u00ecw\2\u0471\u0473\5\u00eav\2\u0472\u046b\3\2\2\2"+
		"\u0472\u046c\3\2\2\2\u0472\u046d\3\2\2\2\u0472\u046e\3\2\2\2\u0472\u046f"+
		"\3\2\2\2\u0472\u0470\3\2\2\2\u0472\u0471\3\2\2\2\u0473\u00df\3\2\2\2\u0474"+
		"\u0475\5j\66\2\u0475\u0476\7\u009e\2\2\u0476\u0477\7T\2\2\u0477\u0478"+
		"\7\u009e\2\2\u0478\u0479\5\u00eex\2\u0479\u00e1\3\2\2\2\u047a\u047b\5"+
		"j\66\2\u047b\u047c\7\u009e\2\2\u047c\u047d\7T\2\2\u047d\u047e\7\u009e"+
		"\2\2\u047e\u047f\5\u00ceh\2\u047f\u0480\7\u009e\2\2\u0480\u0481\7\u009b"+
		"\2\2\u0481\u0482\7\u009e\2\2\u0482\u0483\5\u00fe\u0080\2\u0483\u0484\7"+
		"\u009e\2\2\u0484\u0485\7U\2\2\u0485\u00e3\3\2\2\2\u0486\u0487\5j\66\2"+
		"\u0487\u0488\7\u009e\2\2\u0488\u0489\7V\2\2\u0489\u00e5\3\2\2\2\u048a"+
		"\u048b\5j\66\2\u048b\u048c\7\u009e\2\2\u048c\u048d\7W\2\2\u048d\u00e7"+
		"\3\2\2\2\u048e\u048f\5j\66\2\u048f\u0490\7\u009e\2\2\u0490\u0493\7X\2"+
		"\2\u0491\u0492\7\u009e\2\2\u0492\u0494\5\2\2\2\u0493\u0491\3\2\2\2\u0493"+
		"\u0494\3\2\2\2\u0494\u0495\3\2\2\2\u0495\u0496\7\u009e\2\2\u0496\u0497"+
		"\5> \2\u0497\u00e9\3\2\2\2\u0498\u0499\5j\66\2\u0499\u049a\7\u009e\2\2"+
		"\u049a\u049d\7Y\2\2\u049b\u049c\7\u009e\2\2\u049c\u049e\5\2\2\2\u049d"+
		"\u049b\3\2\2\2\u049d\u049e\3\2\2\2\u049e\u049f\3\2\2\2\u049f\u04a0\7\u009e"+
		"\2\2\u04a0\u04a1\5@!\2\u04a1\u00eb\3\2\2\2\u04a2\u04a3\5j\66\2\u04a3\u04a4"+
		"\7Z\2\2\u04a4\u04a5\7\u009b\2\2\u04a5\u04a6\7,\2\2\u04a6\u00ed\3\2\2\2"+
		"\u04a7\u04ab\7\17\2\2\u04a8\u04aa\7\u009e\2\2\u04a9\u04a8\3\2\2\2\u04aa"+
		"\u04ad\3\2\2\2\u04ab\u04a9\3\2\2\2\u04ab\u04ac\3\2\2\2\u04ac\u04b4\3\2"+
		"\2\2\u04ad\u04ab\3\2\2\2\u04ae\u04b0\5\u00f0y\2\u04af\u04b1\7\u009e\2"+
		"\2\u04b0\u04af\3\2\2\2\u04b0\u04b1\3\2\2\2\u04b1\u04b3\3\2\2\2\u04b2\u04ae"+
		"\3\2\2\2\u04b3\u04b6\3\2\2\2\u04b4\u04b2\3\2\2\2\u04b4\u04b5\3\2\2\2\u04b5"+
		"\u04ba\3\2\2\2\u04b6\u04b4\3\2\2\2\u04b7\u04b9\7\u009e\2\2\u04b8\u04b7"+
		"\3\2\2\2\u04b9\u04bc\3\2\2\2\u04ba\u04b8\3\2\2\2\u04ba\u04bb\3\2\2\2\u04bb"+
		"\u04bd\3\2\2\2\u04bc\u04ba\3\2\2\2\u04bd\u04be\7\20\2\2\u04be\u00ef\3"+
		"\2\2\2\u04bf\u04c6\5\u00f2z\2\u04c0\u04c6\5\u00f6|\2\u04c1\u04c6\5\u00f4"+
		"{\2\u04c2\u04c6\5\u00f8}\2\u04c3\u04c6\5\u00fa~\2\u04c4\u04c6\5\u00fc"+
		"\177\2\u04c5\u04bf\3\2\2\2\u04c5\u04c0\3\2\2\2\u04c5\u04c1\3\2\2\2\u04c5"+
		"\u04c2\3\2\2\2\u04c5\u04c3\3\2\2\2\u04c5\u04c4\3\2\2\2\u04c6\u00f1\3\2"+
		"\2\2\u04c7\u04c8\t\22\2\2\u04c8\u00f3\3\2\2\2\u04c9\u04ca\t\23\2\2\u04ca"+
		"\u00f5\3\2\2\2\u04cb\u04cc\t\24\2\2\u04cc\u00f7\3\2\2\2\u04cd\u04ce\t"+
		"\25\2\2\u04ce\u00f9\3\2\2\2\u04cf\u04d0\t\26\2\2\u04d0\u00fb\3\2\2\2\u04d1"+
		"\u04d2\t\27\2\2\u04d2\u00fd\3\2\2\2\u04d3\u04d8\5\u0102\u0082\2\u04d4"+
		"\u04d8\5\u0100\u0081\2\u04d5\u04d8\5\u0104\u0083\2\u04d6\u04d8\5\u0106"+
		"\u0084\2\u04d7\u04d3\3\2\2\2\u04d7\u04d4\3\2\2\2\u04d7\u04d5\3\2\2\2\u04d7"+
		"\u04d6\3\2\2\2\u04d8\u00ff\3\2\2\2\u04d9\u04da\t\30\2\2\u04da\u0101\3"+
		"\2\2\2\u04db\u04dc\t\31\2\2\u04dc\u0103\3\2\2\2\u04dd\u04de\t\32\2\2\u04de"+
		"\u0105\3\2\2\2\u04df\u04e0\t\33\2\2\u04e0\u0107\3\2\2\2\u04e1\u04e7\5"+
		"\u010a\u0086\2\u04e2\u04e7\5\u010c\u0087\2\u04e3\u04e7\5\u010e\u0088\2"+
		"\u04e4\u04e7\5\u0110\u0089\2\u04e5\u04e7\5\u0112\u008a\2\u04e6\u04e1\3"+
		"\2\2\2\u04e6\u04e2\3\2\2\2\u04e6\u04e3\3\2\2\2\u04e6\u04e4\3\2\2\2\u04e6"+
		"\u04e5\3\2\2\2\u04e7\u0109\3\2\2\2\u04e8\u04e9\t\34\2\2\u04e9\u010b\3"+
		"\2\2\2\u04ea\u04eb\t\35\2\2\u04eb\u010d\3\2\2\2\u04ec\u04ed\t\36\2\2\u04ed"+
		"\u010f\3\2\2\2\u04ee\u04ef\t\37\2\2\u04ef\u0111\3\2\2\2\u04f0\u04f1\t"+
		" \2\2\u04f1\u0113\3\2\2\2\u04f2\u04fb\5\u0118\u008d\2\u04f3\u04fb\5\u011a"+
		"\u008e\2\u04f4\u04fb\5\u011c\u008f\2\u04f5\u04fb\5\u011e\u0090\2\u04f6"+
		"\u04fb\5\u0120\u0091\2\u04f7\u04fb\5\u0122\u0092\2\u04f8\u04fb\5\u0124"+
		"\u0093\2\u04f9\u04fb\5\u0126\u0094\2\u04fa\u04f2\3\2\2\2\u04fa\u04f3\3"+
		"\2\2\2\u04fa\u04f4\3\2\2\2\u04fa\u04f5\3\2\2\2\u04fa\u04f6\3\2\2\2\u04fa"+
		"\u04f7\3\2\2\2\u04fa\u04f8\3\2\2\2\u04fa\u04f9\3\2\2\2\u04fb\u0115\3\2"+
		"\2\2\u04fc\u04fd\t!\2\2\u04fd\u0117\3\2\2\2\u04fe\u0503\7}\2\2\u04ff\u0500"+
		"\5\u0116\u008c\2\u0500\u0501\7~\2\2\u0501\u0503\3\2\2\2\u0502\u04fe\3"+
		"\2\2\2\u0502\u04ff\3\2\2\2\u0503\u0119\3\2\2\2\u0504\u0509\7\177\2\2\u0505"+
		"\u0506\5\u0116\u008c\2\u0506\u0507\7\u0080\2\2\u0507\u0509\3\2\2\2\u0508"+
		"\u0504\3\2\2\2\u0508\u0505\3\2\2\2\u0509\u011b\3\2\2\2\u050a\u050f\7\u0081"+
		"\2\2\u050b\u050c\5\u0116\u008c\2\u050c\u050d\5\u00fa~\2\u050d\u050f\3"+
		"\2\2\2\u050e\u050a\3\2\2\2\u050e\u050b\3\2\2\2\u050f\u011d\3\2\2\2\u0510"+
		"\u0515\7\u0082\2\2\u0511\u0512\5\u0116\u008c\2\u0512\u0513\5\u00f6|\2"+
		"\u0513\u0515\3\2\2\2\u0514\u0510\3\2\2\2\u0514\u0511\3\2\2\2\u0515\u011f"+
		"\3\2\2\2\u0516\u051b\7\u0083\2\2\u0517\u0518\5\u0116\u008c\2\u0518\u0519"+
		"\5\u00f4{\2\u0519\u051b\3\2\2\2\u051a\u0516\3\2\2\2\u051a\u0517\3\2\2"+
		"\2\u051b\u0121\3\2\2\2\u051c\u0521\7\u0084\2\2\u051d\u051e\5\u0116\u008c"+
		"\2\u051e\u051f\5\u00f8}\2\u051f\u0521\3\2\2\2\u0520\u051c\3\2\2\2\u0520"+
		"\u051d\3\2\2\2\u0521\u0123\3\2\2\2\u0522\u0527\7\u0085\2\2\u0523\u0524"+
		"\5\u0116\u008c\2\u0524\u0525\5\u00f2z\2\u0525\u0527\3\2\2\2\u0526\u0522"+
		"\3\2\2\2\u0526\u0523\3\2\2\2\u0527\u0125\3\2\2\2\u0528\u052d\7\u0086\2"+
		"\2\u0529\u052a\5\u0116\u008c\2\u052a\u052b\7\u00a6\2\2\u052b\u052d\3\2"+
		"\2\2\u052c\u0528\3\2\2\2\u052c\u0529\3\2\2\2\u052d\u0127\3\2\2\2\u052e"+
		"\u0537\5\u012a\u0096\2\u052f\u0537\5\u012c\u0097\2\u0530\u0537\5\u012e"+
		"\u0098\2\u0531\u0537\5\u0130\u0099\2\u0532\u0537\5\u0132\u009a\2\u0533"+
		"\u0537\5\u0134\u009b\2\u0534\u0537\5\u0136\u009c\2\u0535\u0537\5\u0138"+
		"\u009d\2\u0536\u052e\3\2\2\2\u0536\u052f\3\2\2\2\u0536\u0530\3\2\2\2\u0536"+
		"\u0531\3\2\2\2\u0536\u0532\3\2\2\2\u0536\u0533\3\2\2\2\u0536\u0534\3\2"+
		"\2\2\u0536\u0535\3\2\2\2\u0537\u0129\3\2\2\2\u0538\u0539\t\"\2\2\u0539"+
		"\u012b\3\2\2\2\u053a\u053b\t#\2\2\u053b\u012d\3\2\2\2\u053c\u053d\t$\2"+
		"\2\u053d\u012f\3\2\2\2\u053e\u053f\t%\2\2\u053f\u0131\3\2\2\2\u0540\u0541"+
		"\t&\2\2\u0541\u0133\3\2\2\2\u0542\u0543\t\'\2\2\u0543\u0135\3\2\2\2\u0544"+
		"\u0545\t(\2\2\u0545\u0137\3\2\2\2\u0546\u0547\t)\2\2\u0547\u0139\3\2\2"+
		"\2\u0548\u054e\5\u0102\u0082\2\u0549\u054e\5\u0100\u0081\2\u054a\u054e"+
		"\5\u0110\u0089\2\u054b\u054e\5\u013c\u009f\2\u054c\u054e\5\u013e\u00a0"+
		"\2\u054d\u0548\3\2\2\2\u054d\u0549\3\2\2\2\u054d\u054a\3\2\2\2\u054d\u054b"+
		"\3\2\2\2\u054d\u054c\3\2\2\2\u054e\u013b\3\2\2\2\u054f\u0550\t*\2\2\u0550"+
		"\u013d\3\2\2\2\u0551\u0552\t+\2\2\u0552\u013f\3\2\2\2\u0553\u0554\t,\2"+
		"\2\u0554\u0141\3\2\2\2i\u014b\u0152\u0157\u015e\u016a\u0172\u0177\u017b"+
		"\u0180\u0184\u0192\u019d\u01a8\u01ac\u01ca\u01e4\u01f0\u0206\u020b\u0212"+
		"\u0218\u0224\u0229\u022f\u0235\u0238\u023b\u023f\u0243\u0246\u0249\u024e"+
		"\u025a\u025f\u0268\u026e\u0271\u0274\u0278\u027c\u027f\u0282\u0287\u0293"+
		"\u02a6\u02ab\u02be\u02c9\u02cd\u02db\u02df\u02e9\u02ed\u02f7\u02fb\u0305"+
		"\u0309\u0313\u0317\u0321\u0325\u032c\u0336\u033d\u0343\u034d\u035a\u035f"+
		"\u0372\u037e\u0385\u038d\u0394\u039c\u03a3\u03ab\u03b2\u03c9\u03d8\u03db"+
		"\u0435\u045b\u0472\u0493\u049d\u04ab\u04b0\u04b4\u04ba\u04c5\u04d7\u04e6"+
		"\u04fa\u0502\u0508\u050e\u0514\u051a\u0520\u0526\u052c\u0536\u054d";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}