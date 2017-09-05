package info.joninousiainen.lanit.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Party {
  private Integer id;
  private String code;
  private String name;
}
