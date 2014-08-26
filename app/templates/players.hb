<section>
  <div class="search-tools">
  <div class="filter">
  <label>Position</label>
  <div>
    <ol>
      <li>
        {{view Ember.Select
         content=possiblePositions
         selection=positionFilter}}
      </li>

    </ol>
  </div>
  </div>
  <div class="filter">
  <label>Name</label>
  <div>
    <ol>
      <li>
        {{input value=fullNameFilter }}
      </li>
    </ol>
  </div>
  </div>
  <div class="filter">
  <label>Team</label>
  <div>
    <ol>
      <li>
        {{input value=teamFilter }}

      </li>

    </ol>
  </div>
  </div>

  <div class="filter">
  <label>Availble/Drafted</label>
  <div>
    <ol>
      <li>
        {{view Ember.Select
         content=availableFilterOptions
         selection=availableFilter}}

      </li>

    </ol>
  </div>
  </div>

  </div>

</section>


<section>

  <article>





  <table class="table-minimal">
    <thead>
      <tr>
        <th>Name</th>
        <th>Team</th>
        <th>Position</th>
        <th>PPG</th>
        <th>Position Rank</th>
      </tr>
    </thead>
    <tbody>
      {{#each player in filteredPlayers}}

        <tr>
          <td>{{player.full_name}}</td>
          <td>{{player.team}}</td>
          <td>{{player.position}}</td>
          <td>{{player.ppg}}</td>
          <th>{{player.rank}}</td>
          <td>
            {{#if player.available}}
          <button {{action 'draft' player}}>Draft</button><button {{action 'draftOther' player}}>Mark Drafted</button></td>
          {{/if}}
        </tr>

      {{/each}}


    </tbody>
  </table>


</article>

<aside>
  <h2>Our Team</h2>

  <ol>
  {{#each player in onTeam}}
    <li>{{player.full_name}}, {{player.position}}</li>
  {{/each}}
  </ol>
</aside>



</section>
