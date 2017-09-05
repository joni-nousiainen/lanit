package info.joninousiainen.lanit;

import info.joninousiainen.lanit.model.Party;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/party")
public class PartyController {
  private final Logger LOG = LoggerFactory.getLogger(getClass());

  private final JdbcTemplate jdbcTemplate;

  @Autowired
  public PartyController(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  @GetMapping(value = "/{partyCode}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public Party getParty(@PathVariable String partyCode) {
    return jdbcTemplate.queryForObject("select * from parties where code = ?",
      (resultSet, i) -> new Party(
        resultSet.getInt("id"),
        resultSet.getString("code"),
        resultSet.getString("name")
      ), partyCode);
  }

  @GetMapping(value = "/{partyCode}/gamers", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public List<String> getPartyGamers(@PathVariable String partyCode) {
    return jdbcTemplate.queryForList(
      "select g.name from parties p left join gamers g on p.id = g.party_id where p.code = ? order by g.name",
      String.class,
      partyCode);
  }

  @GetMapping(value = "/{partyCode}/games-with-votes", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public List getPartyGames(@PathVariable String partyCode) {
    return jdbcTemplate.query(
      "SELECT\n" +
        "  g1.name                  AS game,\n" +
        "  count(v.*)               AS votes,\n" +
        "  string_agg(g2.name, ',') AS voters\n" +
        "FROM parties p\n" +
        "  LEFT JOIN games g1 ON p.id = g1.party_id\n" +
        "  LEFT JOIN votes v ON g1.id = v.game_id\n" +
        "  LEFT JOIN gamers g2 ON v.gamer_id = g2.id\n" +
        "WHERE p.code = ?\n" +
        "GROUP BY g1.name\n" +
        "ORDER BY votes DESC, game ASC",
      (resultSet, i) -> {
        Map map = new LinkedHashMap();
        map.put("game", resultSet.getString("game"));
        map.put("votes", resultSet.getInt("votes"));
        String voters = resultSet.getString("voters");
        if (StringUtils.hasText(voters)) {
          map.put("voters",  voters.split(","));
        }
        return map;
      },
      partyCode);
  }

  @PostMapping("/{partyCode}/vote")
  public void addVote(@PathVariable String partyCode,
                      @RequestParam("gamer") String gamer,
                      @RequestParam("game") String game) {
    LOG.info("Action in party {}: {} voted for {}", partyCode, gamer, game);
    jdbcTemplate.update(
      "INSERT INTO votes (gamer_id, game_id)" +
        " (SELECT g1.id, g2.id FROM gamers g1, games g2 WHERE g1.name = ? AND g2.name = ?)" +
        " ON CONFLICT DO NOTHING",
      gamer, game);
  }
}
