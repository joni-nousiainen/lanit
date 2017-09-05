package info.joninousiainen.lanit;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Party {
  private Integer id;
  private String code;
  private String name;
}
