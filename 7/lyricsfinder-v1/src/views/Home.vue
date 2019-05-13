<template>
  <el-container class="lf-home-view" direction="vertical">
    <Search @search-triggered="search($event)" @search-cleared="searchCleared()"></Search>
    <el-divider></el-divider>
    <el-row class="lf-home-view-results">
      <el-col :span="12">
        <el-container class="lf-artists" direction="vertical">
          <h3>Artists</h3>
          <el-container v-loading="artistsLoading">
            <ul>
              <li v-for="artist in artists" :key="artist.id">{{artist.name}}</li>
            </ul>
          </el-container>
        </el-container>
      </el-col>
      <el-col :span="12">
        <SongsList :songs="songs" :songsLoading="songsLoading" @song-selected="songSelected($event)"></SongsList>
      </el-col>
    </el-row>
  </el-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Search from '@/components/Search.vue';
import {MusicService} from '@/services';
import {TYPES} from '@/ioc/types';
import {lazyInject} from '@/ioc/config';
import {Artist, Song} from '@/domain';
import SongsList from '@/components/SongsList.vue';
import {ROUTES} from '@/router/router';

@Component({
  components: {
    SongsList,
    Search,
  },
})
export default class Home extends Vue {
  @lazyInject(TYPES.MUSIC_SERVICE)
  private musicService!: MusicService;

  private artists: Artist[] = [];
  private artistsLoading = false;

  private songs: Song[] = [];
  private songsLoading = false;

  public mounted() {
    console.log('Home component mounted');
    console.log('Music service instance: ', this.musicService);
  }

  public search(searchText: string): void {
    console.log('Handling search: ', searchText);

    this.artistsLoading = true;
    const artistsSearchSubscription = this.musicService.findArtists(searchText).subscribe({
      next: (artists: Artist[]) => {
        console.log(`Artists search result received. Found ${artists.length} artists`);
        this.artists = artists;
        this.artistsLoading = false;
      },
      error: (err: any) => {
        console.error('Error: ', err);
        this.artistsLoading = false;
        artistsSearchSubscription.unsubscribe();

      },
      complete: () => {
        this.artistsLoading = false;
        artistsSearchSubscription.unsubscribe();
      },
    });

    this.songsLoading = true;
    const songsSearchSubscription = this.musicService.findSongs(searchText).subscribe({
      next: (songs: Song[]) => {
        console.log(`Songs search result received. Found ${songs.length} artists`);
        this.songs = songs;
        this.songsLoading = false;
      },
      error: (err: any) => {
        console.error('Error: ', err);
        this.songsLoading = false;
        songsSearchSubscription.unsubscribe();

      },
      complete: () => {
        this.songsLoading = false;
        songsSearchSubscription.unsubscribe();
      },
    });
  }

  public searchCleared(): void {
    console.log('Handling search cleared');
  }

  public songSelected(selectedSong: Song): void {
    console.log(`Song selected: [${selectedSong.name}]. Loading its lyrics`);

    const lyricsSearchSubscription = this.musicService.findLyrics(selectedSong).subscribe({
      next: (lyrics) => {
        console.log(`Lyrics loaded for [${selectedSong.name}]: ${lyrics.lyrics}`);

        console.log('Redirecting to the lyrics view');
        this.$router.push({
          name: ROUTES.LYRICS,
          params: {
            song: selectedSong,
            songLyrics: lyrics,
          },
        } as any); // oops opportunity to improve
      },
      error: (err: any) => {
        console.error('Error: ', err);
        lyricsSearchSubscription.unsubscribe();
      },
      complete: () => {
        lyricsSearchSubscription.unsubscribe();
      },
    });
  }
}
</script>

<style>
  .lf-artists > h3 {
    color: var(--font-color);
  }

  .lf-artists ul {
    text-align: initial;
  }

  .lf-home-view-results {
    color: var(--font-color);
  }
</style>
